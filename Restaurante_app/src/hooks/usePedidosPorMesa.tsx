import { useState } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Pedido, PedidosPorMesaResponse } from "../interfaces/restauranteInterface";

export const usePedidosPorMesa = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPedidosPorMesa = async (mesa: number) => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>(`/restaurante-pedidos/pedidos-mesa?mesa=${mesa}`);
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setPedidos(data);
    setIsLoading(false);
  };

  return { pedidos, isLoading, loadPedidosPorMesa };
};
