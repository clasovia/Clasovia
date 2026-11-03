import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { createServer } from 'node:http'
import test from 'node:test'
import app from '../app.js'
import {
  validateCreateOrder,
  validatePaymentVerification,
} from '../middleware/validatePayment.js'
import { verifyRazorpaySignature } from '../services/paymentService.js'

function runMiddleware(middleware, body) {
  const req = { body }
  const res = {
    statusCode: 200,
    status(statusCode) {
      this.statusCode = statusCode
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }
  let nextCalled = false

  middleware(req, res, () => {
    nextCalled = true
  })

  return { req, res, nextCalled }
}

test('HTTP app serves health checks and returns JSON for invalid requests', async (t) => {
  const server = createServer(app)
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  }))

  const { port } = server.address()
  const baseUrl = `http://127.0.0.1:${port}`
  const healthResponse = await fetch(`${baseUrl}/health`, {
    headers: { Connection: 'close' },
  })

  assert.equal(healthResponse.status, 200)
  assert.deepEqual(await healthResponse.json(), { success: true, status: 'ok' })

  const invalidOrderResponse = await fetch(`${baseUrl}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'close',
    },
    body: '{',
  })

  assert.equal(invalidOrderResponse.status, 400)
  assert.equal((await invalidOrderResponse.json()).success, false)
})

test('create-order validation normalizes valid payment details', () => {
  const result = runMiddleware(validateCreateOrder, {
    name: '  Ada Lovelace ',
    email: '  ADA@example.com ',
    phone: '1234567890',
  })

  assert.equal(result.nextCalled, true)
  assert.deepEqual(result.req.body, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '1234567890',
  })
})

test('create-order validation rejects malformed request bodies', () => {
  for (const body of [undefined, [], { name: {}, email: 'bad', phone: '1' }]) {
    const result = runMiddleware(validateCreateOrder, body)
    assert.equal(result.nextCalled, false)
    assert.equal(result.res.statusCode, 400)
    assert.equal(result.res.payload.success, false)
  }
})

test('payment verification validation requires payment identifiers and a hex signature', () => {
  const valid = runMiddleware(validatePaymentVerification, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '1234567890',
    razorpay_order_id: 'order_123',
    razorpay_payment_id: 'pay_123',
    razorpay_signature: 'a'.repeat(64),
  })

  assert.equal(valid.nextCalled, true)

  const invalid = runMiddleware(validatePaymentVerification, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '1234567890',
    razorpay_order_id: 'order_123',
    razorpay_payment_id: 'pay_123',
    razorpay_signature: 'not-a-signature',
  })

  assert.equal(invalid.nextCalled, false)
  assert.equal(invalid.res.statusCode, 400)
})

test('Razorpay signature verification accepts matching and rejects altered signatures', () => {
  const secret = 'test-secret'
  const orderId = 'order_123'
  const paymentId = 'pay_123'
  const signature = createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  assert.equal(verifyRazorpaySignature(orderId, paymentId, signature, secret), true)
  assert.equal(verifyRazorpaySignature(orderId, paymentId, '0'.repeat(64), secret), false)
  assert.equal(verifyRazorpaySignature(orderId, paymentId, 'bad', secret), false)
})
