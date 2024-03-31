class CommentDataIncompleteError extends Error {
  constructor() {
    super('Comment data is incomplete');
    this.name = 'CommentDataIncompleteError';
  }
}

export default CommentDataIncompleteError;
