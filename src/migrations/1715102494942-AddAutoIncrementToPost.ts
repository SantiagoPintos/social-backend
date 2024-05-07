import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoIncrementToPost1715102494942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL, "comments" integer, CONSTRAINT "FK_8a10334e239c2003b354d37cbff" FOREIGN KEY ("comments") REFERENCES "comment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION);`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "autorId", "content", "date", "likes", "comments") SELECT "id", "autorId", "content", "date", "likes", "comments" FROM "post";`);
        await queryRunner.query(`DROP TABLE "post";`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY NOT NULL, "autorId" integer NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "likes" integer NOT NULL, "comments" integer, CONSTRAINT "FK_8a10334e239c2003b354d37cbff" FOREIGN KEY ("comments") REFERENCES "comment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION);`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "autorId", "content", "date", "likes", "comments") SELECT "id", "autorId", "content", "date", "likes", "comments" FROM "post";`);
        await queryRunner.query(`DROP TABLE "post";`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }

}
