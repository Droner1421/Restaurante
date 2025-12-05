// Interfaces para consumir la API Restaurante-Pedidos

export interface Restaurante {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  // Otros campos relevantes
}

export interface Platillo {
  id?: number;
  id_platillo?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  restauranteId?: number;
  // Otros campos relevantes
}

export interface Pedido {
  id_pedido?: number;
  id?: number;
  fecha: string;
  hora?: string;
  mesa: string | number;
  metodo_pago: string;
  total: string | number;
  estatus?: string;
  estado?: string;
  restaurante?: {
    id?: number;
    nombre?: string;
    [key: string]: any;
  };
  restauranteId?: number;
  platillos?: PedidoPlatillo[];
  // Otros campos relevantes
}

export interface PedidoPlatillo {
  platilloId: number;
  cantidad: number;
  // Otros campos relevantes
}

// Respuestas de endpoints
export type RestaurantesResponse = Restaurante[];
export type PlatillosDisponiblesResponse = Platillo[];
export type PlatillosPorCategoriaResponse = Platillo[];
export type PedidosPorFechaResponse = Pedido[];
export type PedidosPorMetodoPagoResponse = Pedido[];
export type PedidosPorMesaResponse = Pedido[];
export type PedidosPendientesResponse = Pedido[];
export type PlatillosConPedidosResponse = Array<{
  platillo: Platillo;
  pedidos: Pedido[];
}>;
