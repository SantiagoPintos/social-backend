import { Entity } from "typeorm";
import { Publication } from "./Publication";

@Entity()
export class Post extends Publication {
}
