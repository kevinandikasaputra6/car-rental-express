class NotFoundError extends Error {
  constructor(err, message = "Not Found") {
    super();
    this.message = message;
    this.statusCode = 404;
    this.error = err || message;
  }
}

module.exports = NotFoundError;
