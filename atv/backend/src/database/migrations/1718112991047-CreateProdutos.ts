import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutos1714929354075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'codigoProduto',
                        type: 'varchar',
                    },
                    {
                        name: 'nomeProduto',
                        type: 'varchar',
                    },
                    {
                        name: 'precoProduto',
                        type: 'varchar',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos");
    }

}