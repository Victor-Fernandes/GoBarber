/* eslint-disable @typescript-eslint/class-name-casing */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAvatarFieldToUsers1587577922589
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
