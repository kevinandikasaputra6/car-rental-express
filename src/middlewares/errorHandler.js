function errorHandler(err, req, res, next) {
  console.error(err.error || err);

  // Set the response status code based on the error status code or default to 500.
  const { statusCode = 500, message } = err;

  // Log the error for debugging purposes.

  // Send a JSON response with the error message and status code.
  return res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message,
  });
}

module.exports = errorHandler;
