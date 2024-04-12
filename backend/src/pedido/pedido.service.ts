import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoDTO } from './dto/pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Prato } from 'src/prato/entities/prato.entity';
import { ItemPedido } from 'src/item_pedido/entities/item_pedido.entity';

export interface PedidoItens {
    pedido: Pedido;
    itensPedido: ItemPedido[];
}

@Injectable()
export class PedidoService {
    
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,
        @InjectRepository(Prato)
        private readonly pratoRepository: Repository<Prato>,
        @InjectRepository(ItemPedido)
        private readonly itemRepository: Repository<ItemPedido>    
    ) {}   

    async findOne(cpf_cliente:string): Promise<Pedido[]> {
        try {
            const pedido = await this.pedidoRepository.find({
                relations: ['prato'],
                where:{
                    cpf_cliente:cpf_cliente
                }              
            })
            if (pedido.length < 1) {
                throw new NotFoundException('Nenhum pedido registrado para este cliente')
            } else {
                return pedido
            }
        } catch (error) {         
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível buscar o pedido' + error.message
                )
            }
        }
    }

    async create(pedidoDTO: PedidoDTO): Promise<PedidoItens> {
        try {
            // busca todos os pratos
            const pratosPromises = pedidoDTO.pratos.map(async prato => {
                const pratoEncontrado = await this.pratoRepository.findOne({
                    where: { 
                        id: prato.id 
                    } 
                });                
                return pratoEncontrado;
            });
    
            const pratosPedido = await Promise.all(pratosPromises);            
            
            // caso um prato não for encontrado o pedido é cancelado
            if (pratosPedido.some(prato => prato === null)) {
                throw new NotFoundException('Um ou mais pratos não foram encontrados');
            } else {
                
                //cadastra pedido
                const pedido = new Pedido();
                pedido.cpf_cliente = pedidoDTO.cpf_cliente;
                pedido.nome_cliente = pedidoDTO.nome_cliente;
                pedido.numero_mesa = pedidoDTO.numero_mesa;
                pedido.status = pedidoDTO.status;
                const pedidoCadastrado = await this.pedidoRepository.save(pedido);

                //cadastra item do pedido
                const itensPedido = [];
                if(pedidoCadastrado?.id){
                    const pedidosCriados = await Promise.all(pratosPedido.map(async prato => {                        
                        const item_pedido = new ItemPedido();
                        item_pedido.pedido = pedido
                        item_pedido.prato = prato
                        const itemPedidoCriado = await this.itemRepository.save(item_pedido)
                        itensPedido.push(itemPedidoCriado.prato);
                    }));    
                    return {
                        pedido: pedidoCadastrado,
                        itensPedido: itensPedido
                    };
                }
                throw new InternalServerErrorException('Erro! o pedido não pode ser cadastrado');                
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error;
            } else {
                throw new InternalServerErrorException('Não foi possível cadastrar o pedido: ' + error?.message);
            }
        }
    }

    async listarPedidosPorCPF(cpf: string) {
        try {
            const customSql = `
                SELECT 
                    ped.id,
                    ped.numero_mesa,
                    ped.cpf_cliente,
                    ped.nome_cliente,
                    ped.status AS status_pedido,
                    ped.data_pedido AS data_pedido,
                    json_agg(
                        json_build_object(
                            'nome', pt.nome,
                            'descricao', pt.descricao,
                            'preco', pt.preco,
                            'tempo_preparo', pt.tempo_preparo,
                            'hora_estimada', ped.data_pedido + (pt.tempo_preparo || ' minutes')::interval
                        )
                    ) AS itens_pedido,
                    (
                        SELECT 
                            ped.data_pedido + INTERVAL '1 minute' * SUM(pt.tempo_preparo)
                        FROM 
                            item_pedido ip
                        LEFT JOIN 
                            prato pt ON pt.id = ip."pratoId"
                        WHERE 
                            ip."pedidoId" = ped.id
                    ) AS hora_estimada_pedido
                FROM 
                    pedido ped
                LEFT JOIN 
                    item_pedido ip ON ip."pedidoId" = ped.id
                LEFT JOIN 
                    prato pt ON pt.id = ip."pratoId"
                WHERE 
                    ped.cpf_cliente = $1
                GROUP by
                    ped.id,
                    ped.numero_mesa,
                    ped.cpf_cliente,
                    ped.nome_cliente,
                    ped.status,
                    ped.data_pedido;               
            `;
    
            return await this.pedidoRepository.query(customSql, [cpf]);
          
        } catch (error) {
            throw new InternalServerErrorException('Não foi possível listar os pedidos: ' + error?.message);
        }
    }    

    async statusPedido(id: number,status?:string): Promise<Pedido> {
        try {            
            const pedidoEncontrado = await this.pedidoRepository.findOneBy({ id })            

            if (!pedidoEncontrado) {
                throw new NotFoundException(
                    `Pedido com id ${id} não encontrado.`
                )
            } else {
                const pedido = new Pedido()

                pedido.status = status
                pedido.id = id
                return this.pedidoRepository.save(pedido)
            }           
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                throw error
            } else {
                throw new InternalServerErrorException(
                    'Não foi possível atualizar o pedido' + error.message
                )
            }
        }
    }
}


