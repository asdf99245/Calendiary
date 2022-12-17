const STATUS_CODE = require('./statusCode');

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequestError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.UNAUTHORIZED, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.NOT_FOUND, message);
  }
}

export class ConflictError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.CONFLICT, message);
  }
}

export class InternalServerError extends CustomError {
  constructor(message) {
    super(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
  }
}
