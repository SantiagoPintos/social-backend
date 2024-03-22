interface UserToRegisterDTO{
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
}

interface UserToLoginDTO{
    username: string,
    password: string,
}

export { UserToRegisterDTO, UserToLoginDTO }