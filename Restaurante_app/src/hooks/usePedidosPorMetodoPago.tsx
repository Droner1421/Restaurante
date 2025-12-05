import { useState } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Pedido, PedidosPorMetodoPagoResponse } from "../interfaces/restauranteInterface";

export const usePedidosPorMetodoPago = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPedidosPorMetodoPago = async (metodo_pago: string) => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>(`/restaurante-pedidos/pedidos-metodo-pago?metodo_pago=${encodeURIComponent(metodo_pago)}`);
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setPedidos(data);
    setIsLoading(false);
  };

  return { pedidos, isLoading, loadPedidosPorMetodoPago };
};
