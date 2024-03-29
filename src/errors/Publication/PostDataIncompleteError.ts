class PostDataIncompleteError extends Error {
    constructor() {
        super('Post data is incomplete');
        this.name = 'PostDataIncompleteError';
    }
}

export default PostDataIncompleteError;
