import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PedidoItens, PedidoService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';
import { PedidoBuscaPipe } from './pipes/pedidoBuscaPipe..pipe';
import { PedidoDTO } from './dto/pedido.dto';

@Controller('api/pedido')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Get(':cpf')
    // @UsePipes(new PedidoBuscaPipe())
    async getPedido(@Param('cpf') cpf: string): Promise<Pedido[]> {
        return this.pedidoService.findOne(cpf);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPedido(@Body() pedidoDTO: PedidoDTO): Promise<PedidoItens> {
        return this.pedidoService.create(pedidoDTO);
    }

    @Get('listPedido/:cpf')
    async listPedido(@Param('cpf') cpf: string):Promise<any> {
        return this.pedidoService.listarPedidosPorCPF(cpf)
    }

    @Put('updateStatus/:id')
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {  
        return this.pedidoService.statusPedido(+id,status)
    }
}
