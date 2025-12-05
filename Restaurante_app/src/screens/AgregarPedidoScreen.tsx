import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePedidosRestaurante } from '../hooks/usePedidosRestaurante';

export const AgregarPedidoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const restauranteId = route.params?.restauranteId;
  const { createPedido } = usePedidosRestaurante(restauranteId);

  const [pedido, setPedido] = useState({
    fecha: '',
    hora: '',
    mesa: '',
    metodo_pago: '',
    total: '',
    estatus: 'pendiente',
  });

  const onCreatePedido = async () => {
    if (!pedido.mesa || !pedido.total || !pedido.metodo_pago || !pedido.fecha) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }
    if (!restauranteId) {
      Alert.alert('Error', 'No se encontró el restaurante seleccionado');
      return;
    }
    await createPedido({ ...pedido, total: Number(pedido.total), mesa: pedido.mesa, restauranteId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Pedido</Text>
      <TextInput style={styles.input} placeholder="Fecha" value={pedido.fecha} onChangeText={v => setPedido({ ...pedido, fecha: v })} />
      <TextInput style={styles.input} placeholder="Hora" value={pedido.hora} onChangeText={v => setPedido({ ...pedido, hora: v })} />
      <TextInput style={styles.input} placeholder="Mesa" value={pedido.mesa} onChangeText={v => setPedido({ ...pedido, mesa: v })} keyboardType="number-pad" />
      <TextInput style={styles.input} placeholder="Total" value={pedido.total} onChangeText={v => setPedido({ ...pedido, total: v })} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Método Pago" value={pedido.metodo_pago} onChangeText={v => setPedido({ ...pedido, metodo_pago: v })} />
      <View style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 4 }}>Estatus</Text>
        <Picker
          selectedValue={pedido.estatus}
          onValueChange={v => setPedido({ ...pedido, estatus: v })}
        >
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Pagado" value="pagado" />
          <Picker.Item label="Cancelado" value="cancelado" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={onCreatePedido}>
        <Text style={styles.buttonText}>Crear Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#667eea', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
