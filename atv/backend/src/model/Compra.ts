import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("compras")
export class Compra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    codigoCompra: string;

    @Column('varchar')
    nomeCliente: string;

    @Column('varchar')
    cpfCliente: string;

    @Column('varchar')
    nomeProdServ: string;

    @Column('varchar')
    codigoProdServ: string;

    @Column('varchar')
    valor: string;

    @Column('varchar')
    quantidade: string;

    @Column('varchar')
    tipoPet: string;

    @Column('varchar')
    racaPet: string;

    @Column('varchar')
    totalCompra: string;
}

export default Compra;