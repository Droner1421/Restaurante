import { useState, useEffect } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Pedido, PedidosPendientesResponse } from "../interfaces/restauranteInterface";

export const usePedidosPendientes = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPedidosPendientes = async () => {
    setIsLoading(true);
    const resp = await restauranteApi.get("/restaurante-pedidos/pedidos-pendientes");
    if (resp.data && Array.isArray(resp.data.data)) {
      setPedidos(resp.data.data);
    } else {
      setPedidos([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPedidosPendientes();
  }, []);

  return { pedidos, isLoading, loadPedidosPendientes };
};
