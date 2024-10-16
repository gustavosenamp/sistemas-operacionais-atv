import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("servicos")
export class Servico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    codigoServico: string;

    @Column('varchar')
    nomeServico: string;

    @Column('varchar')
    precoServico: string;

}

export default Servico;