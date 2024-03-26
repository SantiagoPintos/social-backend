import { Entity, Column } from "typeorm";
import { Publication } from "./Publication";

@Entity()
export class Comment extends Publication {
  @Column()
  parentPostId!: number;
}
