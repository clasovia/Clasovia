export default function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  const statusCode = error.statusCode
    || (error.type === 'entity.parse.failed' ? 400 : 500)

  if (statusCode >= 500) {
    console.error('Request failed:', error)
  }

  return res.status(statusCode).json({
    success: false,
    error: statusCode >= 500 ? 'Internal server error' : error.message,
  })
}
