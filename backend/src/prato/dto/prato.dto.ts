import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsObject } from 'class-validator'
import { Prato } from '../entities/prato.entity'
import { Categoria } from 'src/categoria/entities/categoria.entity';

export class PratoDTO {
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio' })
    @IsString({ message: 'O campo nome deve ser uma string' })
    nome: string;

    @IsNotEmpty({ message: 'O campo descrição não pode estar vazio' })
    @IsString({ message: 'O campo descrição deve ser uma string' })
    descricao: string;

    @IsNotEmpty({ message: 'O campo preço não pode estar vazio' })
    @IsNumber({}, { message: 'O campo preço deve ser um número' })
    preco: number;

    @IsNotEmpty({ message: 'O campo tempo_preparo não pode estar vazio' })
    @IsNumber({}, { message: 'O campo tempo_preparo deve ser um número' })
    tempo_preparo: number;

    @IsNotEmpty({ message: 'O campo status não pode estar vazio' })
    @IsBoolean({ message: 'O campo status deve ser um booleano' })
    status: boolean;

    @IsNotEmpty({ message: 'O campo categoria não pode estar vazio' })
    @IsObject({ message: 'O campo categoria deve ser um objeto' })
    categoria: Categoria;
}

