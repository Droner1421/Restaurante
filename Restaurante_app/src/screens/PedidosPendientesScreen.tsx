import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { usePedidosPendientes } from '../hooks/usePedidosPendientes';
import { PedidoItem } from '../components/PedidoItem';

export const PedidosPendientesScreen = () => {
  const { pedidos, isLoading } = usePedidosPendientes();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Pedidos Pendientes</Text>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={item => (item.id_pedido ? item.id_pedido.toString() : item.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => <PedidoItem pedido={item} />}
        />
      )}
    </View>
  );
};
