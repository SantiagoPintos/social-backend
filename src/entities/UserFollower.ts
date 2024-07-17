import { User } from "./User";

export class UserFollower {
    id!: number;
    followed!: User;
    follower!: User;

    constructor(id: number, followed: User, follower: User) {
        this.id = id;
        this.followed = followed;
        this.follower = follower;
    }
}
