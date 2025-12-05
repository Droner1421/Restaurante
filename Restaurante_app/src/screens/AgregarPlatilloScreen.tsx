import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePlatillosRestaurante } from '../hooks/usePlatillosRestaurante';

export const AgregarPlatilloScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const restauranteId = route.params?.restauranteId;
  const { createPlatillo } = usePlatillosRestaurante(restauranteId);

  const [platillo, setPlatillo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    disponible: true,
  });

  const onCreatePlatillo = async () => {
    if (!platillo.nombre || !platillo.precio || !platillo.categoria) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }
    await createPlatillo({ ...platillo, precio: Number(platillo.precio), restauranteId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Platillo</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={platillo.nombre} onChangeText={v => setPlatillo({ ...platillo, nombre: v })} />
      <TextInput style={styles.input} placeholder="Descripción" value={platillo.descripcion} onChangeText={v => setPlatillo({ ...platillo, descripcion: v })} />
      <TextInput style={styles.input} placeholder="Precio" value={platillo.precio} onChangeText={v => setPlatillo({ ...platillo, precio: v })} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Categoría" value={platillo.categoria} onChangeText={v => setPlatillo({ ...platillo, categoria: v })} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ marginRight: 8 }}>Disponible</Text>
        <Switch
          value={platillo.disponible}
          onValueChange={v => setPlatillo({ ...platillo, disponible: v })}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onCreatePlatillo}>
        <Text style={styles.buttonText}>Crear Platillo</Text>
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
