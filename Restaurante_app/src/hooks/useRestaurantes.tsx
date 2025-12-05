import { useState, useEffect } from "react";
import { restauranteApi } from "../api/restauranteApi";
import { Restaurante, RestaurantesResponse } from "../interfaces/restauranteInterface";

export const useRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadRestaurantes = async () => {
    setIsLoading(true);
    const resp = await restauranteApi.get<any>("/restaurante-pedidos/restaurantes");
    const data = Array.isArray(resp.data.data) ? resp.data.data : Array.isArray(resp.data) ? resp.data : [];
    setRestaurantes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRestaurantes();
  }, []);

  return { restaurantes, isLoading, loadRestaurantes };
};
