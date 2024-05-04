import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./../entities/User";
import { Tokens } from "./../entities/Tokens";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [
        User, 
        Tokens, 
        Post, 
        Comment
    ],
    migrations: [],
    subscribers: [],
});

