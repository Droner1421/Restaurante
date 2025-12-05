import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Platillo } from './entities/platillo.entity';
import { Pedido } from './entities/pedido.entity';
import { RestaurantePedidosService } from './restaurante-pedidos.service';
import { RestaurantePedidosController } from './restaurante-pedidos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurante, Platillo, Pedido], 'conexion-mysql')],
  controllers: [RestaurantePedidosController],
  providers: [RestaurantePedidosService],
})
export class RestaurantePedidosModule {}
