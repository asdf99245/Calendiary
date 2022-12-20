const STATUS_CODE = require('./statusCode');

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.BAD_REQUEST, message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.UNAUTHORIZED, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.NOT_FOUND, message);
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.CONFLICT, message);
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
