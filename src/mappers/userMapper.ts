import { User } from "@/entities/User";
import { UserDTO, UserToPostDTO } from "@/dtos/user.dto";

class userMapper{
    toDto(user: User): UserDTO{
        const dto: UserDTO = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            profileImage: user.profileImage,           
        }

        return dto;
    }

    fromDTO(dto: UserDTO): User{
        const user: User = new User();
        user.id = dto.id;
        user.name = dto.name;
        user.lastName = dto.lastName;
        user.username = dto.username;
        user.email = dto.email;
        user.password = dto.password;
        user.profileImage = dto.profileImage;
        
        return user;
    }

    toTimelineDTO(user: User): UserToPostDTO{
        const dto: UserToPostDTO = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            profileImage: user.profileImage
        }

        return dto;
    }
}

export default new userMapper();