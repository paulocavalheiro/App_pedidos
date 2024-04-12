import { IsNotEmpty, IsArray } from 'class-validator';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Prato } from 'src/prato/entities/prato.entity';

export class ItemPedidoDTO {
    @IsNotEmpty({ message: 'A lista de pratos não pode estar vazia' })
    @IsArray({ message: 'A lista de pratos deve ser um array' })
    pratos: Prato[];

    @IsNotEmpty({ message: 'A lista de pedidos não pode estar vazia' })
    @IsArray({ message: 'A lista de pedidos deve ser um array' })
    pedidos: Pedido[];
}
