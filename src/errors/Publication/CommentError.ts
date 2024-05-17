class CommentError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'CommentError';
    }
}

export default CommentError;