import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUniqueUsernameMigration1716499621339 implements MigrationInterface {
    name = 'UserUniqueUsernameMigration1716499621339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
            "name" varchar NOT NULL, 
            "lastName" varchar NOT NULL, 
            "username" varchar NOT NULL, 
            "email" varchar NOT NULL, 
            "password" varchar NOT NULL, 
            "profileImage" varchar, 
            CONSTRAINT "unique_username" UNIQUE ("username")
        )`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "lastName", "username", "email", "password", "profileImage") SELECT "id", "name", "lastName", "username", "email", "password", "profileImage" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_follower"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
