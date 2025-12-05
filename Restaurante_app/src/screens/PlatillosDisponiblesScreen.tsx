import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { usePlatillosDisponibles } from '../hooks/usePlatillosDisponibles';
import { PlatilloItem } from '../components/PlatilloItem';

export const PlatillosDisponiblesScreen = () => {
  const { platillos, isLoading, loadPlatillos } = usePlatillosDisponibles();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Platillos Disponibles</Text>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : (
        <FlatList
          data={platillos}
          keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => <PlatilloItem platillo={item} />}
        />
      )}
    </View>
  );
};
