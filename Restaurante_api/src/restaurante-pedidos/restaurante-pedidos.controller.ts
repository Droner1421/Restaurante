import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantePedidosService } from './restaurante-pedidos.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('restaurante-pedidos')
export class RestaurantePedidosController {
  constructor(private readonly service: RestaurantePedidosService) {}

  @Get('restaurantes')
  findAllRestaurantes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findAllRestaurantes(Number(page), Number(limit), baseUrl);
  }

  @Post('restaurantes')
  createRestaurante(@Body() dto: CreateRestauranteDto) {
    return this.service.createRestaurante(dto);
  }

  @Patch('restaurantes/:id')
  updateRestaurante(@Param('id') id: number, @Body() dto: UpdateRestauranteDto) {
    return this.service.updateRestaurante(id, dto);
  }

  @Delete('restaurantes/:id')
  removeRestaurante(@Param('id') id: number) {
    return this.service.removeRestaurante(id);
  }

  @Get('platillos-disponibles')
  findPlatillosDisponibles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPlatillosDisponibles(Number(page), Number(limit), baseUrl);
  }

  @Get('platillos-por-restaurante')
  findPlatillosPorRestaurante(
    @Query('restauranteId') restauranteId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPlatillosPorRestaurante(Number(restauranteId), Number(page), Number(limit), baseUrl);
  }

  @Post('platillos')
  createPlatillo(@Body() dto: CreatePlatilloDto) {
    return this.service.createPlatillo(dto);
  }

  @Patch('platillos/:id')
  updatePlatillo(@Param('id') id: number, @Body() dto: UpdatePlatilloDto) {
    return this.service.updatePlatillo(id, dto);
  }

  @Delete('platillos/:id')
  removePlatillo(@Param('id') id: number) {
    return this.service.removePlatillo(id);
  }

  @Get('platillos-categoria')
  findPlatillosPorCategoria(
    @Query('categoria') categoria: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPlatillosPorCategoria(categoria, Number(page), Number(limit), baseUrl);
  }

  @Get('pedidos-fecha')
  findPedidosPorFecha(
    @Query('fecha') fecha: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPedidosPorFecha(fecha, Number(page), Number(limit), baseUrl);
  }

  @Get('pedidos-por-restaurante')
  findPedidosPorRestaurante(
    @Query('restauranteId') restauranteId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPedidosPorRestaurante(Number(restauranteId), Number(page), Number(limit), baseUrl);
  }

  @Post('pedidos')
  createPedido(@Body() dto: CreatePedidoDto) {
    return this.service.createPedido(dto);
  }

  @Patch('pedidos/:id')
  updatePedido(@Param('id') id: number, @Body() dto: UpdatePedidoDto) {
    return this.service.updatePedido(id, dto);
  }

  @Delete('pedidos/:id')
  removePedido(@Param('id') id: number) {
    return this.service.removePedido(id);
  }

  @Get('pedidos-metodo-pago')
  findPedidosPorMetodoPago(
    @Query('metodo_pago') metodo_pago: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPedidosPorMetodoPago(metodo_pago, Number(page), Number(limit), baseUrl);
  }

  @Get('pedidos-mesa')
  findPedidosPorMesa(
    @Query('mesa') mesa: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPedidosPorMesa(mesa, Number(page), Number(limit), baseUrl);
  }

  @Get('pedidos-pendientes')
  findPedidosPendientes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPedidosPendientes(Number(page), Number(limit), baseUrl);
  }

  @Get('platillos-con-pedidos')
  findPlatillosConPedidos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('baseUrl') baseUrl?: string
  ) {
    return this.service.findPlatillosConPedidos(Number(page), Number(limit), baseUrl);
  }
}
