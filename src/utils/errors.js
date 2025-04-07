export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class NotLoggedIn extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotLoggedIn';
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}
