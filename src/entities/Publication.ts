import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Publication{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    autorId!: number;

    @Column()
    content!: string;

    @Column()
    date!: Date;

    @Column()
    likes!: number;
}
