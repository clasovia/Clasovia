const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60 * 1000

export default function createRateLimiter() {
  const requestsByIp = new Map()
  let requestCount = 0

  return (req, res, next) => {
    const now = Date.now()
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const recentRequests = (requestsByIp.get(ip) || [])
      .filter((timestamp) => timestamp > now - RATE_LIMIT_WINDOW_MS)

    if (recentRequests.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, try again shortly',
      })
    }

    recentRequests.push(now)
    requestsByIp.set(ip, recentRequests)

    requestCount += 1
    if (requestCount % 100 === 0) {
      for (const [address, timestamps] of requestsByIp) {
        if (timestamps.every((timestamp) => timestamp <= now - RATE_LIMIT_WINDOW_MS)) {
          requestsByIp.delete(address)
        }
      }
    }

    return next()
  }
}
