import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PratoModule } from './prato/prato.module';
import { PedidoModule } from './pedido/pedido.module';
import { ItemPedidoModule } from './item_pedido/item_pedido.module';


@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db', // alterar para localhost(sem docker)
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
        autoLoadEntities: true, 
    }),
    CategoriaModule,
    PratoModule,
    PedidoModule,
    ItemPedidoModule    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
