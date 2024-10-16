import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicos1714929371626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "servicos",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'codigoServico',
                        type: 'varchar',
                    },
                    {
                        name: 'nomeServico',
                        type: 'varchar',
                    },
                    {
                        name: 'precoServico',
                        type: 'varchar',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("servicos");
    }

}