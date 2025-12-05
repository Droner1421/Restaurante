import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Platillo } from '../interfaces/restauranteInterface';

interface PlatilloItemProps {
  platillo: Platillo;
}

export const PlatilloItem: React.FC<PlatilloItemProps> = ({ platillo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{platillo.nombre}</Text>
      <Text style={styles.categoria}>{platillo.categoria}</Text>
      <Text style={styles.precio}>
        {typeof platillo.precio === 'number' ? `$${platillo.precio.toFixed(2)}` : 'Sin precio'}
      </Text>
      <Text style={styles.descripcion}>{platillo.descripcion}</Text>
      <Text style={platillo.disponible ? styles.disponible : styles.noDisponible}>
        {platillo.disponible ? 'Disponible' : 'No disponible'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  categoria: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  precio: {
    fontSize: 15,
    color: '#009688',
    marginTop: 2,
  },
  descripcion: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  disponible: {
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 4,
  },
  noDisponible: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 4,
  },
});
