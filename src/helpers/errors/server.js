class ServerError extends Error {
  constructor(message = "Internal Server Error") {
    super();
    this.statusCode = 500;
    // Mask the Error message for security reasons.
    this.message = "Internal Server Error";
    this.error = message;
  }
}

module.exports = ServerError;
