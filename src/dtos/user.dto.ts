interface UserDTO{
    id: number,
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    profileImage: string
}

interface UserToPostDTO{
    id: number,
    name: string,
    lastName: string,
    username: string,
    profileImage: string
}

export { UserDTO, UserToPostDTO }
