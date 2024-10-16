import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompras1714943017214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compras",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'codigoCompra',
                        type: 'varchar',
                    },
                    {
                        name: 'nomeCliente',
                        type: 'varchar',
                    },
                    {
                        name: 'cpfCliente',
                        type: 'varchar',
                    },
                    {
                        name: 'nomeProdServ',
                        type: 'varchar',
                    },
                    {
                        name: 'codigoProdServ',
                        type: 'varchar',
                    },
                    {
                        name: 'valor',
                        type: 'varchar',
                    },
                    {
                        name: 'quantidade',
                        type: 'varchar',
                    },
                    {
                        name: 'tipoPet',
                        type: 'varchar',
                    },
                    {
                        name: 'racaPet',
                        type: 'varchar',
                    },
                    {
                        name: 'totalCompra',
                        type: 'varchar',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compras");
    }
}