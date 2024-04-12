import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PratoService } from './prato.service';
import { Prato } from './entities/prato.entity';
import { PratoDTO } from './dto/prato.dto';

@Controller('api/prato')
export class PratoController {
    constructor(private readonly pratoService: PratoService) {}

    @Get('listar')
    async getPratos(): Promise<Prato[]> {
        return this.pratoService.findAll()
    }

    @Get('visualizar/:id')
    async getPrato(@Param('id') id: number): Promise<Prato> {
        return this.pratoService.findPrato(id)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPrato(@Body() pratoDTO: PratoDTO) {
        return this.pratoService.create(pratoDTO)
    }   

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() pratoDTO: PratoDTO) {
        return this.pratoService.updatePrato(+id,pratoDTO)
    }
    
    @Put('updateStatus/:id')
    async updateStatus(@Param('id') id: string) {
        return this.pratoService.statusPrato(+id)
    }

}
