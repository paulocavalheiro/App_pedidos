import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'
import { Categoria } from '../entities/categoria.entity'

export class CategoriaDTO {
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio' })
    @IsString({ message: 'O campo nome deve ser uma string' })
    nome: string;

    @IsNotEmpty({ message: 'O campo status não pode estar vazio' })
    @IsBoolean({ message: 'O campo status deve ser um booleano' })
    status: boolean;

    @IsString({ message: 'O campo icone deve ser uma string' })
    @IsNotEmpty({ message: 'O campo icone não pode estar vazio' })
    icone: string;
}
