import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { usePedidosPorMesa } from '../hooks/usePedidosPorMesa';
import { PedidoItem } from '../components/PedidoItem';

export const PedidosPorMesaScreen = () => {
  const { pedidos, isLoading, loadPedidosPorMesa } = usePedidosPorMesa();
  const [mesa, setMesa] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Pedidos por Mesa</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
          placeholder="Número de mesa"
          value={mesa}
          onChangeText={setMesa}
          keyboardType="numeric"
        />
        <Button title="Buscar" onPress={() => loadPedidosPorMesa(Number(mesa))} />
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
