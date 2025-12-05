import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { Platillo } from './entities/platillo.entity';
import { Pedido } from './entities/pedido.entity';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class RestaurantePedidosService {
  constructor(
    @InjectRepository(Restaurante, 'conexion-mysql')
    private restauranteRepo: Repository<Restaurante>,
    @InjectRepository(Platillo, 'conexion-mysql')
    private platilloRepo: Repository<Platillo>,
    @InjectRepository(Pedido, 'conexion-mysql')
    private pedidoRepo: Repository<Pedido>,
  ) {}

  async findAllRestaurantes(page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.restauranteRepo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.platillos', 'platillo')
      .leftJoinAndSelect('r.pedidos', 'pedido')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('r.id_restaurante', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  createRestaurante(dto: CreateRestauranteDto) {
    return this.restauranteRepo.save(dto);
  }

  updateRestaurante(id: number, dto: UpdateRestauranteDto) {
    return this.restauranteRepo.update(id, dto);
  }

  removeRestaurante(id: number) {
    return this.restauranteRepo.delete(id);
  }

  async findPlatillosDisponibles(page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.platilloRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.disponible = :disponible', { disponible: true })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_platillo', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPlatillosPorRestaurante(restauranteId: number, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.platilloRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.restaurante.id_restaurante = :restauranteId', { restauranteId })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_platillo', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?restauranteId=${restauranteId}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?restauranteId=${restauranteId}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async createPlatillo(dto: CreatePlatilloDto) {
    const restauranteId = dto.restauranteId || dto.id_restaurante;
    if (!restauranteId) {
      throw new Error('restauranteId o id_restaurante es requerido');
    }
    const restaurante = await this.restauranteRepo.findOne({
      where: { id_restaurante: restauranteId },
    });
    if (!restaurante) {
      throw new NotFoundException(`Restaurante con id ${restauranteId} no encontrado`);
    }
    const { id_restaurante, restauranteId: _, ...platilloData } = dto;
    const platilloToSave = { ...platilloData, restaurante };
    return this.platilloRepo.save(platilloToSave);
  }

  async updatePlatillo(id: number, dto: UpdatePlatilloDto) {
    const platillo = await this.platilloRepo.findOne({ where: { id_platillo: id } });
    if (!platillo) {
      throw new NotFoundException('Platillo no encontrado');
    }
    if (dto.id_restaurante) {
      const restaurante = await this.restauranteRepo.findOne({
        where: { id_restaurante: dto.id_restaurante },
      });
      if (!restaurante) {
        throw new NotFoundException('Restaurante no encontrado');
      }
      platillo.restaurante = restaurante;
    }
    const { id_restaurante, ...updateData } = dto;
    Object.assign(platillo, updateData);
    return this.platilloRepo.save(platillo);
  }

  removePlatillo(id: number) {
    return this.platilloRepo.delete(id);
  }

  async findPlatillosPorCategoria(categoria: string, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.platilloRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.categoria = :categoria', { categoria })
      .andWhere('p.disponible = :disponible', { disponible: true })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_platillo', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?categoria=${categoria}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?categoria=${categoria}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPedidosPorFecha(fecha: string, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.fecha = :fecha', { fecha })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?fecha=${fecha}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?fecha=${fecha}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPedidosPorRestaurante(restauranteId: number, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.restaurante.id_restaurante = :restauranteId', { restauranteId })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?restauranteId=${restauranteId}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?restauranteId=${restauranteId}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPedidosPorMetodoPago(metodo_pago: string, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.metodo_pago = :metodo_pago', { metodo_pago })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?metodo_pago=${metodo_pago}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?metodo_pago=${metodo_pago}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPedidosPorMesa(mesa: string, page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.mesa = :mesa', { mesa })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?mesa=${mesa}&page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?mesa=${mesa}&page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPedidosPendientes(page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .where('p.estatus = :estatus', { estatus: 'pendiente' })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async findPlatillosConPedidos(page: number = 1, limit: number = 10, baseUrl?: string) {
    const [data, total] = await this.pedidoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.restaurante', 'restaurante')
      .leftJoinAndSelect('restaurante.platillos', 'platillo')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('p.id_pedido', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const next = (page < totalPages && baseUrl)
      ? `${baseUrl}?page=${page + 1}&limit=${limit}`
      : null;
    const prev = (page > 1 && baseUrl)
      ? `${baseUrl}?page=${page - 1}&limit=${limit}`
      : null;

    return { total, totalPages, prev, next, page, limit, data };
  }

  async createPedido(dto: CreatePedidoDto) {
    const restauranteId = dto.restauranteId || dto.id_restaurante;
    if (!restauranteId) {
      throw new Error('restauranteId o id_restaurante es requerido');
    }
    const restaurante = await this.restauranteRepo.findOne({
      where: { id_restaurante: restauranteId },
    });
    if (!restaurante) {
      throw new NotFoundException(`Restaurante con id ${restauranteId} no encontrado`);
    }
    const { id_restaurante, restauranteId: _, ...pedidoData } = dto;
    const pedidoToSave = { ...pedidoData, restaurante };
    return this.pedidoRepo.save(pedidoToSave);
  }

  async updatePedido(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.pedidoRepo.findOne({ where: { id_pedido: id } });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    if (dto.id_restaurante) {
      const restaurante = await this.restauranteRepo.findOne({
        where: { id_restaurante: dto.id_restaurante },
      });
      if (!restaurante) {
        throw new NotFoundException('Restaurante no encontrado');
      }
      pedido.restaurante = restaurante;
    }
    const { id_restaurante, ...updateData } = dto;
    Object.assign(pedido, updateData);
    return this.pedidoRepo.save(pedido);
  }

  removePedido(id: number) {
    return this.pedidoRepo.delete(id);
  }
}
