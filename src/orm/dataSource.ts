import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./../entities/User";
import { Tokens } from "./../entities/Tokens";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";
import path from "path";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: true,
    entities: [
        User, 
        Tokens, 
        Post, 
        Comment
    ],
    migrations: [
        path.join(__dirname, "./src/migrations/*.ts")
    ],
    subscribers: [],
});



