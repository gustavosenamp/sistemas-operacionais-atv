import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("pets")
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    cpfDono: string;

    @Column('varchar')
    nomePet: string;

    @Column('varchar')
    tipo: string;

    @Column('varchar')
    raca: string;

    @Column('varchar')
    genero: string;
}

export default Pet;