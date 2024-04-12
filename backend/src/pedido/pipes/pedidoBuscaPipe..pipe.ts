import {
    PipeTransform,
    BadRequestException,
    ArgumentMetadata,
} from '@nestjs/common'

export class PedidoBuscaPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(
                `Parametro ${metadata.data}, não pode ser vazio.`
            )
        }
        return value
    }
}
