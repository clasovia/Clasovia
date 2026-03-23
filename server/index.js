const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
const PaymentUser = require("./models/PaymentUser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// very light rate limit to prevent abuse
const rateLimitTracker = new Map();
const RATE_LIMIT_MAX = 10; // per minute

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - 60 * 1000;

  const record = rateLimitTracker.get(ip) || [];
  const updated = record.filter((timestamp) => timestamp > windowStart);

  if (updated.length >= RATE_LIMIT_MAX) {
    return res
      .status(429)
      .json({ success: false, error: "Too many requests, try again shortly" });
  }

  updated.push(now);
  rateLimitTracker.set(ip, updated);
  next();
});

// Create order
app.post("/create-order", async (req, res) => {
  try {
    const { name, email, phone } = req.body || {};

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, error: "name, email, phone are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!emailRegex.test(email) || !phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or phone format",
      });
    }

    const options = {
      amount: 9900, // ₹99 in paise (fixed amount)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { name, email, phone },
    };

    const order = await razorpay.orders.create(options);
    console.log(`Order created: ${order.id} for ${email}`);

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
});

// Verify payment
app.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment fields",
      });
    }

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "User details are required",
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    const isValid = razorpay_signature === expectedSign;

    const paymentRecord = new PaymentUser({
      name,
      email,
      phone,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      status: isValid ? "success" : "failed",
    });

    await paymentRecord.save();

    if (!isValid) {
      console.log("Payment verification failed for order", razorpay_order_id);
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    console.log("Payment verified and saved", razorpay_payment_id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});