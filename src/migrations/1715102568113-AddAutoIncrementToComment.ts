import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoIncrementToComment1715102568113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL, "parentPostId" integer, CONSTRAINT "FK_a9e04da1fa7a9b54df08c59741d" FOREIGN KEY ("parentPostId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION);`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "autorId", "content", "date", "likes", "parentPostId") SELECT "id", "autorId", "content", "date", "likes", "parentPostId" FROM "comment";`);
        await queryRunner.query(`DROP TABLE "comment";`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL, "parentPostId" integer, CONSTRAINT "FK_a9e04da1fa7a9b54df08c59741d" FOREIGN KEY ("parentPostId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION);`);
        await queryRunner.query(`INSERT INTO "temporary_comment"("id", "autorId", "content", "date", "likes", "parentPostId") SELECT "id", "autorId", "content", "date", "likes", "parentPostId" FROM "comment";`);
        await queryRunner.query(`DROP TABLE "comment";`);
        await queryRunner.query(`ALTER TABLE "temporary_comment" RENAME TO "comment";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }

}
