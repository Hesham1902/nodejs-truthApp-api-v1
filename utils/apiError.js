class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
  }

  getStatusCode() {
    console.logthis.statusCode;
  }
}
module.exports = ApiError;
