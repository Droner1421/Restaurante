import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { usePlatillosPorCategoria } from '../hooks/usePlatillosPorCategoria';
import { PlatilloItem } from '../components/PlatilloItem';

export const PlatillosPorCategoriaScreen = () => {
  const { platillos, isLoading, loadPlatillosPorCategoria } = usePlatillosPorCategoria();
  const [categoria, setCategoria] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Platillos por Categoría</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 }}
          placeholder="Categoría"
          value={categoria}
          onChangeText={setCategoria}
        />
        <Button title="Buscar" onPress={() => loadPlatillosPorCategoria(categoria)} />
      </View>
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
