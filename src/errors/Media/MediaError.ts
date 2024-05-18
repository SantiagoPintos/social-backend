class MediaError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'MediaError';
    }
}

export default MediaError;
