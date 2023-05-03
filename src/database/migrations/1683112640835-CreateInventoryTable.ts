import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryTable1683112640835 implements MigrationInterface {
    name = 'CreateInventoryTable1683112640835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" character varying NOT NULL DEFAULT now(), "updatedAt" character varying NOT NULL DEFAULT now(), "name" character varying NOT NULL, "quantity_in_stock" integer NOT NULL, "description" character varying NOT NULL, "cost_price" integer NOT NULL, "selling_price" integer NOT NULL, "categoryId" uuid, CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_47d21fcf49d54d5cbd4a09b22d9" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_47d21fcf49d54d5cbd4a09b22d9"`);
        await queryRunner.query(`DROP TABLE "inventories"`);
    }

}
