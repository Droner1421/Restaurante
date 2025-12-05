import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type RestauranteApi = {
  id?: number;
  id_restaurante?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  gerente?: string;
  capacidad?: number;
  horario?: string;
};

interface RestauranteCardProps {
  restaurante: RestauranteApi;
  onPress: (restaurante: RestauranteApi) => void;
}

export const RestauranteCard: React.FC<RestauranteCardProps> = ({ restaurante, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(restaurante)} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{restaurante.nombre.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={2}>{restaurante.nombre}</Text>
          <Text style={styles.direccion}>{restaurante.direccion}</Text>
          <Text style={styles.telefono}>Tel: {restaurante.telefono}</Text>
          {restaurante.gerente ? <Text style={styles.gerente}>Gerente: {restaurante.gerente}</Text> : null}
          {restaurante.capacidad ? <Text style={styles.capacidad}>Capacidad: {restaurante.capacidad}</Text> : null}
          {restaurante.horario ? <Text style={styles.horario}>Horario: {restaurante.horario}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
    gerente: {
    fontSize: 13,
    color: '#888',
    marginTop: 2
  },
  capacidad: {
    fontSize: 13,
    color: '#888',
    marginTop: 2
  },
  horario: {
    fontSize: 13,
    color: '#888',
    marginTop: 2
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  direccion: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  telefono: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});
