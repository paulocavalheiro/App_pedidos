import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDTO } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
    // injecao dependencia da cat
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>
    ) {}

    async findOne(id: number): Promise<Categoria> {
        try {            
            const categoria = await this.categoriaRepository.findOneBy({ id })
            
            if (!categoria) {
                throw new NotFoundException(
                    `Categoria com id ${id} não encontrada.`
                )
            } else {
                return categoria
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível buscar a categoria' + error.message
                )
            }
        }
    }

    async findAll(): Promise<Categoria[]> {
        try {            
            const categoria = await this.categoriaRepository.find({
                where: { status: true }
            })
            
            if (categoria.length < 1) {
                throw new NotFoundException(
                    `Categorias não cadastrada.`
                )
            } else {
                return categoria
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível listar a categoria' + error.message
                )
            }
        }
    }

    async create(categoriaDTO: CategoriaDTO): Promise<Categoria> {
        try {

            const categoria:Categoria = new Categoria()
            categoria.nome = categoriaDTO.nome
            categoria.status = categoriaDTO.status
            categoria.icone = categoriaDTO.icone

            return this.categoriaRepository.save(categoria)
        } catch (error) {
            throw new InternalServerErrorException(
                `Erro! não foi possivel cadastrar a categoria`
            )
        }
    }
}
