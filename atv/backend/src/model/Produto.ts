import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("produtos")
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    codigoProduto: string;

    @Column('varchar')
    nomeProduto: string;

    @Column('varchar')
    precoProduto: string;
}

export default Produto;