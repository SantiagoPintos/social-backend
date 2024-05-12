import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLikesMigration1715551193770 implements MigrationInterface {
    name = 'AddLikesMigration1715551193770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "userId" integer, "postId" integer, "commentId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "parentPostId" integer, CONSTRAINT "FK_3c477117e0a3e5e2bb533bab561" FOREIGN KEY ("parentPostId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "autorId", "content", "date", "parentPostId") SELECT "id", "autorId", "content", "date", "parentPostId" FROM "comment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment"`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "autorId", "content", "date") SELECT "id", "autorId", "content", "date" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
        await queryRunner.query(`CREATE TABLE "temporary_like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "userId" integer, "postId" integer, "commentId" integer, CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d86e0a3eeecc21faa0da415a18a" FOREIGN KEY ("commentId") REFERENCES "comment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_like"("id", "date", "userId", "postId", "commentId") SELECT "id", "date", "userId", "postId", "commentId" FROM "like"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`ALTER TABLE "temporary_like" RENAME TO "like"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" RENAME TO "temporary_like"`);
        await queryRunner.query(`CREATE TABLE "like" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "userId" integer, "postId" integer, "commentId" integer)`);
        await queryRunner.query(`INSERT INTO "like"("id", "date", "userId", "postId", "commentId") SELECT "id", "date", "userId", "postId", "commentId" FROM "temporary_like"`);
        await queryRunner.query(`DROP TABLE "temporary_like"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "post"("id", "autorId", "content", "date") SELECT "id", "autorId", "content", "date" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME TO "temporary_comment"`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL, "parentPostId" integer, CONSTRAINT "FK_3c477117e0a3e5e2bb533bab561" FOREIGN KEY ("parentPostId") REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "comment"("id", "autorId", "content", "date", "parentPostId") SELECT "id", "autorId", "content", "date", "parentPostId" FROM "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "temporary_comment"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
