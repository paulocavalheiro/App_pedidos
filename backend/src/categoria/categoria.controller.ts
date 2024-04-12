import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDTO } from './dto/categoria.dto';

@Controller('api/categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get('listar')
    async getCategorias(): Promise<Categoria[]> {   
         console.log('listar')    
        return this.categoriaService.findAll()
    }

    @Get(':id')
    async getCategoria(@Param('id') id: string): Promise<Categoria> {   
        console.log('buscar')      
        return this.categoriaService.findOne(+id)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCtegoria(@Body() CategoriaDTO: CategoriaDTO) {
        return this.categoriaService.create(CategoriaDTO)
    } 
}
