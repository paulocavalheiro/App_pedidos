import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Prato } from 'src/prato/entities/prato.entity';
import { ItemPedido } from 'src/item_pedido/entities/item_pedido.entity';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;    

    @Column()
    numero_mesa: number;

    @Column()
    cpf_cliente: string;

    @Column()
    nome_cliente: string;

    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_pedido: Date;

    @OneToMany(() => ItemPedido, itemPedido => itemPedido.pedido)
    itensPedidos: ItemPedido[];
}
