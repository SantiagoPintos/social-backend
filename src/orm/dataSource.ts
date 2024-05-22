import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./../entities/User";
import { Tokens } from "./../entities/Tokens";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";
import { Like } from "./../entities/Like";
import { UserFollower } from "./../entities/UserFollower";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: false,
    entities: [
        User, 
        Tokens, 
        Post, 
        Comment,
        Like,
        UserFollower
    ],
    migrations: [
        __dirname + "/../migrations/*{.ts,.js}"
    ],
    subscribers: [],
});



