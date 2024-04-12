import { Module } from '@nestjs/common';
import { PratoService } from './prato.service';
import { PratoController } from './prato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prato } from './entities/prato.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Prato]),
        TypeOrmModule.forFeature([Categoria]),
    ],
    providers: [PratoService],
    controllers: [PratoController]
})
export class PratoModule {}
