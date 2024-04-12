import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Prato } from 'src/prato/entities/prato.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Pedido, pedido => pedido.itensPedidos)
    pedido: Pedido;

    @ManyToOne(() => Prato, prato => prato.itensPedido)
    prato: Prato;
}
