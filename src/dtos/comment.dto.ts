interface CommentDTO{
    id: number,
    autorId: number,
    content: string,
    date: Date,
    likes: number,
    parentPostId: number
}

export { CommentDTO }
