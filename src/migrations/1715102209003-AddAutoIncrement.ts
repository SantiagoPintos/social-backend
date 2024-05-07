import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoIncrement1715102209003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL);`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "lastName", "username", "email", "password") SELECT "id", "name", "lastName", "username", "email", "password" FROM "user";`);
        await queryRunner.query(`DROP TABLE "user";`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`PRAGMA foreign_keys=off;`);
        await queryRunner.query(`BEGIN TRANSACTION;`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL);`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "lastName", "username", "email", "password") SELECT "id", "name", "lastName", "username", "email", "password" FROM "user";`);
        await queryRunner.query(`DROP TABLE "user";`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user";`);
        await queryRunner.query(`COMMIT;`);
        await queryRunner.query(`PRAGMA foreign_keys=on;`);
    }
}
