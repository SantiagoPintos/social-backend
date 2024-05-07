import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokensTable1714849143620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tokens',
      columns: [
        { name: 'userId', type: 'int', isPrimary: true },
        { name: 'token', type: 'varchar' },
        { name: 'generated', type: 'datetime' },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
