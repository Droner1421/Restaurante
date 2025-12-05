import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePedidosService } from './restaurante-pedidos.service';

describe('RestaurantePedidosService', () => {
  let service: RestaurantePedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantePedidosService],
    }).compile();

    service = module.get<RestaurantePedidosService>(RestaurantePedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
