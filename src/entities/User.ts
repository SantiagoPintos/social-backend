import { Like } from "./Like";
import { UserFollower } from "./UserFollower";

export class User {
    id!: number;
    name!: string;
    lastName!: string;
    username!: string;
    email!: string;
    password!: string;
    profileImage!: string;
    likes!: Like[];
    followers!: UserFollower[];
    following!: UserFollower[];

    constructor(id: number, name: string, lastName: string, username: string, email: string, password: string, profileImage: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.likes = new Array<Like>();
        this.followers = new Array<UserFollower>();
        this.following = new Array<UserFollower>();
    }
}

