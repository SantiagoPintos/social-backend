class PostError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'PostError';
    }
}

export default PostError;
