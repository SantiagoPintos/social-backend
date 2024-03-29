class UserDataIncompleteError extends Error {
  constructor(message?: string) {
    super(message || 'User data is incomplete');
    this.name = 'UserDataIncompleteError';
  }
}

export default UserDataIncompleteError;
