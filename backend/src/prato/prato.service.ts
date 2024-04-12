import { Body, Injectable, InternalServerErrorException, NotFoundException, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prato } from './entities/prato.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { PratoDTO } from './dto/prato.dto';

@Injectable()
export class PratoService {

    constructor(
        @InjectRepository(Prato)
        private readonly pratoRepository: Repository<Prato>,
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Prato[]> {
        try {
            const prato = await this.pratoRepository.find({
                relations: ['categoria'],
                order: { nome: 'ASC' },
                where: { status: true },
            })

            if (prato.length < 1) {
                throw new NotFoundException('Nenhum prato cadastrado')
            } else {
                return prato
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível listar os pratos' + error.message
                )
            }
        }
    }

    async findPrato(id:number): Promise<Prato> {
        try {
            
            const prato = await this.pratoRepository.findOne({
                relations: ['categoria'],
                where: {
                    id: id, 
                    status: true 
                },
            })

            if (!prato) {
                throw new NotFoundException('Nenhum prato cadastrado')
            } else {
                return prato
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível listar os pratos' + error.message
                )
            }
        }
    }

    async statusPrato(id: number): Promise<Prato> {
        try {
            const pratoEncontrado = await this.pratoRepository.findOneBy({ id })

            if (!pratoEncontrado) {
                throw new NotFoundException(
                    `Prato com id ${id} não encontrado.`
                )
            } else {
                const prato: Prato = new Prato()
                prato.status = !pratoEncontrado.status
                prato.id = id
                return this.pratoRepository.save(prato)
            }           
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível buscar o prato' + error.message
                )
            }
        }
    }

    async updatePrato(id: number, pratoDTO:PratoDTO): Promise<Prato> {
        try {
            const pratoEncontrado = await this.pratoRepository.findOneBy({ id })

            if (!pratoEncontrado) {
                throw new NotFoundException(
                    `Prato com id ${id} não encontrado.`
                )
            } else {
                const categoria = await this.getCategoria(pratoDTO)

                const prato: Prato = new Prato()
                prato.nome = pratoDTO.nome
                prato.descricao = pratoDTO.descricao
                prato.categoria = categoria
                prato.preco = pratoDTO.preco
                prato.status = pratoDTO.status
                prato.tempo_preparo = pratoDTO.tempo_preparo
                prato.id = id
                return this.pratoRepository.save(prato)
            }           
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível buscar o prato' + error.message
                )
            }
        }
    }

    async create(pratoDTO: PratoDTO): Promise<Prato> {
        try {
            const categoria = await this.getCategoria(pratoDTO)

            const prato: Prato = new Prato()
            prato.nome = pratoDTO.nome
            prato.descricao = pratoDTO.descricao
            prato.categoria = categoria
            prato.preco = pratoDTO.preco
            prato.status = pratoDTO.status
            prato.tempo_preparo = pratoDTO.tempo_preparo
            return this.pratoRepository.save(prato)
        } catch (error) {
            throw new InternalServerErrorException(
                `Erro! não foi possivel cadastrar o prato`
            )
        }
    }

    async getCategoria(pratoDTO: PratoDTO): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: {
                nome: pratoDTO.categoria.nome
            },
        })
        if (!categoria) {
            throw new NotFoundException(
                'Não foi possivel cadastrar o prato, Categoria não encontrada'
            )
        } else {
            return categoria
        }
    }   
}
