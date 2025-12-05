import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePedidosModule } from './restaurante-pedidos.module';

describe('RestaurantePedidosModule', () => {
  let module: RestaurantePedidosModule;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [RestaurantePedidosModule],
    }).compile();

    module = testingModule.get<RestaurantePedidosModule>(RestaurantePedidosModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
