import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRestaurantes } from '../hooks/useRestaurantes';
import { RestauranteCard, RestauranteApi } from '../components/RestauranteCard';

export const RestaurantesListScreen = () => {
  const navigation = useNavigation<any>();
  const { restaurantes, isLoading, loadRestaurantes } = useRestaurantes();
  const [refreshing, setRefreshing] = useState(false);

  const handleRestaurantePress = (restaurante: RestauranteApi) => {
    navigation.navigate('RestauranteDetail', { restaurante });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRestaurantes();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 16 }}>Restaurantes</Text>
      {isLoading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando...</Text>
      ) : (
        <FlatList
          data={restaurantes}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <RestauranteCard restaurante={item} onPress={handleRestaurantePress} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#667eea']}
              progressBackgroundColor="#fff"
            />
          }
        />
      )}
    </View>
  );
};
