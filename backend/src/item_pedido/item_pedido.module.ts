import { Module } from '@nestjs/common';
import { ItemPedidoService } from './item_pedido.service';
import { ItemPedidoController } from './item_pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from './entities/item_pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPedido])],
  providers: [ItemPedidoService],
  controllers: [ItemPedidoController]
})
export class ItemPedidoModule {}
