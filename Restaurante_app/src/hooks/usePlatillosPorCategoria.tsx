import { useState } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Platillo, PlatillosPorCategoriaResponse } from "../interfaces/restauranteInterface";

export const usePlatillosPorCategoria = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPlatillosPorCategoria = async (categoria: string) => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>(`/restaurante-pedidos/platillos-categoria?categoria=${encodeURIComponent(categoria)}`);
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setPlatillos(data);
    setIsLoading(false);
  };

  return { platillos, isLoading, loadPlatillosPorCategoria };
};
