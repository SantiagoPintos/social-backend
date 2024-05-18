import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfilePictureMigration1716057963745 implements MigrationInterface {
    name = 'UserProfilePictureMigration1716057963745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImage" varchar` );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("userId" int PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "lastName", "username", "email", "password") SELECT "id", "name", "lastName", "username", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("userId" int PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
    }

}
