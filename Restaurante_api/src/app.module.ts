import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './restaurante-pedidos/entities/restaurante.entity';
import { Platillo } from './restaurante-pedidos/entities/platillo.entity';
import { Pedido } from './restaurante-pedidos/entities/pedido.entity';
import { RestaurantePedidosModule } from './restaurante-pedidos/restaurante-pedidos.module';

@Module({
    imports: [
        
       
        TypeOrmModule.forRoot({
            name: "conexion-mysql",
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "restaurante",
            entities: [Restaurante, Platillo, Pedido],
            synchronize: true,
            autoLoadEntities: true,
        }),
      
        RestaurantePedidosModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
