import { useState } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Pedido, PedidosPorFechaResponse } from "../interfaces/restauranteInterface";

export const usePedidosPorFecha = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPedidosPorFecha = async (fecha: string) => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>(`/restaurante-pedidos/pedidos-fecha?fecha=${encodeURIComponent(fecha)}`);
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setPedidos(data);
    setIsLoading(false);
  };

  return { pedidos, isLoading, loadPedidosPorFecha };
};
