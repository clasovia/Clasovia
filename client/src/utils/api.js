// API utility for frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getRazorpayKey = async () => {
  const response = await fetch(`${API_BASE_URL}/api/get-key`);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to get Razorpay key");
  }

  return response.json();
};

export const createOrder = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to create order");
  }

  return response.json();
};

export const verifyPayment = async (paymentData) => {
  const response = await fetch(`${API_BASE_URL}/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error("Payment verification failed");
  }

  return response.json();
};