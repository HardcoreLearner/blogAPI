const createError = require('http-errors');

// 404 Not Found handler
function notFoundHandler(req, res, next) {
  next(createError(404));
}

// Global error handler
function errorHandler(err, req, res, next) {
  // Set locals
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message }); // Adjust response as needed (e.g., JSON, HTML)
}

module.exports = { notFoundHandler, errorHandler };
