const RateLimit = require('express-rate-limit');

const rateLimitMiddleware = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40, // Limit each IP to 40 requests per minute
});

module.exports = rateLimitMiddleware;
