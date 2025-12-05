import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { usePedidosPorMetodoPago } from '../hooks/usePedidosPorMetodoPago';
import { PedidoItem } from '../components/PedidoItem';

export const PedidosPorMetodoPagoScreen = () => {
  const { pedidos, isLoading, loadPedidosPorMetodoPago } = usePedidosPorMetodoPago();
  const [metodoPago, setMetodoPago] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Pedidos por Método de Pago</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
          placeholder="Método de pago"
          value={metodoPago}
          onChangeText={setMetodoPago}
        />
        <Button title="Buscar" onPress={() => loadPedidosPorMetodoPago(metodoPago)} />
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
