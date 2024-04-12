import { Categoria } from 'src/categoria/entities/categoria.entity'
import { ItemPedido } from 'src/item_pedido/entities/item_pedido.entity'
import { Pedido } from 'src/pedido/entities/pedido.entity'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    ManyToOne,
} from 'typeorm'

@Entity()
export class Prato {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    descricao: string

    @Column({ type: 'decimal', precision: 10, scale: 2 }) 
    preco: number

    @Column({ type: 'integer' }) 
    tempo_preparo: number;

    @Column()
    status: boolean

    // relacao entre prato e categoria (orm)
    @ManyToOne(() => Categoria, (categoria) => categoria.pratos)
    categoria: Categoria

    // relacao entre prato e pedido (orm)
    @OneToMany(() => ItemPedido, itemPedido => itemPedido.pedido)
    itensPedido: ItemPedido[];
    
}