import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserTypeDefaultOptions1682963519949 implements MigrationInterface {
    name = 'ChangeUserTypeDefaultOptions1682963519949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'staff'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" SET DEFAULT 'admin'`);
    }

}
