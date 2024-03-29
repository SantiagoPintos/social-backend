class NotAuthorizedError extends Error {
  constructor() {
    super('Not authorized to access this resource');
    this.name = 'NotAuthorizedError';
  }
}

export default NotAuthorizedError;
