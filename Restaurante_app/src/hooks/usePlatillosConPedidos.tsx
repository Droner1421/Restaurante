import { useState, useEffect } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { PlatillosConPedidosResponse } from "../interfaces/restauranteInterface";

export const usePlatillosConPedidos = () => {
  const [data, setData] = useState<PlatillosConPedidosResponse>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPlatillosConPedidos = async () => {
    setIsLoading(true);
    const resp = await restauranteApi.get("/restaurante-pedidos/platillos-con-pedidos");

    if (resp.data && Array.isArray(resp.data.data)) {
      setData(resp.data.data);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadPlatillosConPedidos();
  }, []);

  return { data, isLoading, loadPlatillosConPedidos };
};
