import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserType1682962945361 implements MigrationInterface {
    name = 'AddedUserType1682962945361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('admin', 'staff')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
    }

}
