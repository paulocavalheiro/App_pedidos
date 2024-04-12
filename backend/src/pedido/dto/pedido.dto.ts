import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Prato } from 'src/prato/entities/prato.entity';

export class PedidoDTO {
    @IsNotEmpty({ message: 'O campo número da mesa não pode estar vazio' })
    @IsNumber({}, { message: 'O campo número da mesa deve ser um número' })
    numero_mesa: number;

    @IsNotEmpty({ message: 'O campo CPF do cliente não pode estar vazio' })
    @IsString({ message: 'O campo CPF do cliente deve ser uma string' })
    cpf_cliente: string;

    @IsNotEmpty({ message: 'O campo nome do cliente não pode estar vazio' })
    @IsString({ message: 'O campo nome do cliente deve ser uma string' })
    nome_cliente: string;

    @IsNotEmpty({ message: 'O campo status não pode estar vazio' })
    @IsString({ message: 'O campo status deve ser uma string' })
    status: string;

    @IsNotEmpty({ message: 'O campo pratos não pode estar vazio' })
    @IsArray({ message: 'O campo pratos deve ser uma lista' })
    @ValidateNested({ each: true })
    @Type(() => Prato)
    pratos: Prato[];
}
