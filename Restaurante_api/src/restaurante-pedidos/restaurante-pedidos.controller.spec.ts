import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePedidosController } from './restaurante-pedidos.controller';
import { RestaurantePedidosService } from './restaurante-pedidos.service';

describe('RestaurantePedidosController', () => {
  let controller: RestaurantePedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantePedidosController],
      providers: [RestaurantePedidosService],
    }).compile();

    controller = module.get<RestaurantePedidosController>(RestaurantePedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
