import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1714849143620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
        { name: 'name', type: 'varchar' },
        { name: 'lastName', type: 'varchar' },
        { name: 'username', type: 'varchar' },
        { name: 'email', type: 'varchar' },
        { name: 'password', type: 'varchar' },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
