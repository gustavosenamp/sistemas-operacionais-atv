import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePets1714929325649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pets",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'cpfDono',
                        type: 'varchar',
                    },
                    {
                        name: 'nomePet',
                        type: 'varchar',
                    },
                    {
                        name: 'tipo',
                        type: 'varchar',
                    },
                    {
                        name: 'raca',
                        type: 'varchar',
                    },
                    {
                        name: 'genero',
                        type: 'varchar',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pets");
    }

}