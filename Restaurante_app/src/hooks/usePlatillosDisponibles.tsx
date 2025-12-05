import { useState, useEffect } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Platillo, PlatillosDisponiblesResponse } from "../interfaces/restauranteInterface";

export const usePlatillosDisponibles = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPlatillos = async () => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>("/restaurante-pedidos/platillos-disponibles");
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setPlatillos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPlatillos();
  }, []);

  return { platillos, isLoading, loadPlatillos };
};
