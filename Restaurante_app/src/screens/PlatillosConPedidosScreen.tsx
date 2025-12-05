import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { usePlatillosConPedidos } from '../hooks/usePlatillosConPedidos';
import { PlatilloConPedidosItem } from '../components/PlatilloConPedidosItem';

export const PlatillosConPedidosScreen = () => {
  const { data, isLoading } = usePlatillosConPedidos();


  const platillosMap: { [id: string]: { platillo: any, pedidos: any[] } } = {};
  if (Array.isArray(data)) {
    data.forEach((pedidoObj: any) => {
    
      if (pedidoObj.restaurante && Array.isArray(pedidoObj.restaurante.platillos)) {
        pedidoObj.restaurante.platillos.forEach((platillo: any) => {
          const id = platillo.id_platillo || platillo.id;
          if (!platillosMap[id]) {
            platillosMap[id] = { platillo, pedidos: [] };
          }
          platillosMap[id].pedidos.push({
            id_pedido: pedidoObj.id_pedido,
            fecha: pedidoObj.fecha,
            hora: pedidoObj.hora,
            mesa: pedidoObj.mesa,
            total: pedidoObj.total,
            metodo_pago: pedidoObj.metodo_pago,
            estatus: pedidoObj.estatus,
            restaurante: pedidoObj.restaurante?.nombre,
          });
        });
      }
    });
  }
  const platillosList = Object.values(platillosMap);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Platillos con Pedidos</Text>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : (
        <FlatList
          data={platillosList}
          keyExtractor={(item, index) => item.platillo?.id_platillo?.toString() || item.platillo?.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#fff', margin: 10, padding: 12, borderRadius: 8, elevation: 2 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#009688', marginBottom: 4 }}>{item.platillo.nombre ?? 'Sin nombre'}</Text>
              <Text>Descripción: {item.platillo.descripcion ?? 'Sin descripción'}</Text>
              <Text>Categoría: {item.platillo.categoria ?? 'Sin categoría'}</Text>
              <Text>Precio: {item.platillo.precio ? `$${item.platillo.precio}` : 'Sin precio'}</Text>
              <Text>Disponible: {item.platillo.disponible === true ? 'Sí' : item.platillo.disponible === false ? 'No' : 'Sin dato'}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 8, marginBottom: 4 }}>Pedidos:</Text>
              {item.pedidos.length > 0 ? (
                item.pedidos.map((pedido: any, idx: number) => (
                  <View key={pedido.id_pedido ?? idx} style={{ backgroundColor: '#f7f7f7', marginVertical: 4, padding: 8, borderRadius: 6 }}>
                    <Text>Pedido #{pedido.id_pedido ?? 'N/A'} - Restaurante: {pedido.restaurante ?? 'Sin nombre'}</Text>
                    <Text>Mesa: {pedido.mesa ?? 'Sin dato'}</Text>
                    <Text>Fecha: {pedido.fecha ? (pedido.fecha.length > 10 ? pedido.fecha.substring(0, 10) : pedido.fecha) : 'Sin fecha'} {pedido.hora ? `- ${pedido.hora}` : ''}</Text>
                    <Text>Total: {pedido.total ? `$${pedido.total}` : 'Sin total'}</Text>
                    <Text>Método de pago: {pedido.metodo_pago ?? 'Sin dato'}</Text>
                    <Text>Estatus: {pedido.estatus ?? 'Sin estatus'}</Text>
                  </View>
                ))
              ) : (
                <Text>No hay pedidos para este platillo.</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};
