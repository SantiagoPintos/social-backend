import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePostTable1714849143620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'post',
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
        { name: 'autorId', type: 'int' },
        { name: 'content', type: 'text' },
        { name: 'date', type: 'datetime' },
        { name: 'likes', type: 'int' },
      ],
    }));

    await queryRunner.createForeignKey('post', new TableForeignKey({
      columnNames: ['autorId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post');
  }
}
