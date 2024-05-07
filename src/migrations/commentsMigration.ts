import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCommentTable1714849143620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comment',
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
        { name: 'autorId', type: 'int' },
        { name: 'content', type: 'text' },
        { name: 'date', type: 'datetime' },
        { name: 'likes', type: 'int' },
        { name: 'parentPostId', type: 'int' },
      ],
    }));

    await queryRunner.createForeignKey('comment', new TableForeignKey({
      columnNames: ['autorId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey('comment', new TableForeignKey({
      columnNames: ['parentPostId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'post',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment');
  }
}
