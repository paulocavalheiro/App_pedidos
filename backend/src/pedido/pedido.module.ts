import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Prato } from 'src/prato/entities/prato.entity';
import { ItemPedido } from 'src/item_pedido/entities/item_pedido.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    TypeOrmModule.forFeature([Prato]),
    TypeOrmModule.forFeature([ItemPedido]),
],
  providers: [PedidoService],
  controllers: [PedidoController]
})
export class PedidoModule {}
