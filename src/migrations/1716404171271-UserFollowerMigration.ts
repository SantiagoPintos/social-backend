import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFollowerMigration1716404171271 implements MigrationInterface {
    name = 'UserFollowerMigration1716404171271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "profileImage" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "lastName", "username", "email", "password", "profileImage") SELECT "id", "name", "lastName", "username", "email", "password", "profileImage" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("userId" int PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
        await queryRunner.query(`CREATE TABLE "user_follower" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "followedId" integer NOT NULL, "followerId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "profileImage" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "lastName", "username", "email", "password", "profileImage") SELECT "id", "name", "lastName", "username", "email", "password", "profileImage" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_tokens" ("userId" integer PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "tokens"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`ALTER TABLE "temporary_tokens" RENAME TO "tokens"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_follower" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "followedId" integer, "followerId" integer, CONSTRAINT "FK_1411997b959d7d724d3e2bec8ca" FOREIGN KEY ("followedId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_86f1191bfce87ddfcaf68438ddf" FOREIGN KEY ("followerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_follower"("id", "followedId", "followerId") SELECT "id", "followedId", "followerId" FROM "user_follower"`);
        await queryRunner.query(`DROP TABLE "user_follower"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_follower" RENAME TO "user_follower"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_follower" RENAME TO "temporary_user_follower"`);
        await queryRunner.query(`CREATE TABLE "user_follower" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "followedId" integer, "followerId" integer)`);
        await queryRunner.query(`INSERT INTO "user_follower"("id", "followedId", "followerId") SELECT "id", "followedId", "followerId" FROM "temporary_user_follower"`);
        await queryRunner.query(`DROP TABLE "temporary_user_follower"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("userId" int PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "profileImage" varchar)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "lastName", "username", "email", "password", "profileImage") SELECT "id", "name", "lastName", "username", "email", "password", "profileImage" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "user_follower"`);
        await queryRunner.query(`ALTER TABLE "tokens" RENAME TO "temporary_tokens"`);
        await queryRunner.query(`CREATE TABLE "tokens" ("userId" int PRIMARY KEY NOT NULL, "token" varchar NOT NULL, "generated" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tokens"("userId", "token", "generated") SELECT "userId", "token", "generated" FROM "temporary_tokens"`);
        await queryRunner.query(`DROP TABLE "temporary_tokens"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "profileImage" varchar)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "lastName", "username", "email", "password", "profileImage") SELECT "id", "name", "lastName", "username", "email", "password", "profileImage" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
