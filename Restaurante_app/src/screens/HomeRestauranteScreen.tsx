import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeRestauranteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Sistema de Restaurante</Text>
      <Text style={styles.subtitle}>Selecciona una opción en el menú para comenzar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
