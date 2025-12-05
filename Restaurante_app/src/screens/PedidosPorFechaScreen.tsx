import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { usePedidosPorFecha } from '../hooks/usePedidosPorFecha';
import { PedidoItem } from '../components/PedidoItem';

export const PedidosPorFechaScreen = () => {
  const { pedidos, isLoading, loadPedidosPorFecha } = usePedidosPorFecha();
  const [fecha, setFecha] = useState('2025-12-01');

  useEffect(() => {
    loadPedidosPorFecha('2025-12-01');

  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Pedidos por Fecha</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
          placeholder="YYYY-MM-DD"
          value={fecha}
          onChangeText={setFecha}
        />
        <Button title="Buscar" onPress={() => loadPedidosPorFecha(fecha)} />
      </View>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={item => (item.id ? item.id.toString() : item.id_pedido ? item.id_pedido.toString() : Math.random().toString())}
          renderItem={({ item }) => <PedidoItem pedido={item} />}
        />
      )}
    </View>
  );
};
