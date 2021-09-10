class BaseError extends Error {
  constructor(message, status, extensions = {}) {
    super(message);
    this.status = status;
    this.extensions = extensions;
  }
}

const sendError = (msg, status) => {
  throw new BaseError(msg, status);
};

module.exports = {
  BaseError,
  sendError,
};
