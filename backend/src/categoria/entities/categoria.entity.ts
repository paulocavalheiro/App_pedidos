
import { Prato } from 'src/prato/entities/prato.entity'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
} from 'typeorm'

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    status: boolean

    @Column()
    icone: string

    @OneToMany(() => Prato, prato => prato.categoria) 
    pratos: Prato[]
    
}
