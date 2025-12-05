import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormRestaurante } from '../hooks/useFormRestaurante';

export const RestauranteCRUDScreen: React.FC<any> = (props: any) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { state, handleInputChange, handleSubmit, handleDelete, loadRestaurante } = useFormRestaurante();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (route.params?.restaurante) {
      loadRestaurante(route.params.restaurante);
    }
  }, [route.params?.restaurante]);

  const onSubmit = async () => {
    if (!state.nombre || !state.direccion || !state.telefono) {
      Alert.alert('Error', 'Por favor completa los campos requeridos: nombre, dirección y teléfono');
      return;
    }
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
    Alert.alert('Éxito', state.id === 0 ? 'Restaurante creado' : 'Restaurante actualizado');
  };

  const onDelete = async () => {
    if (state.id === 0) {
      Alert.alert('Error', 'Selecciona un restaurante para eliminar');
      return;
    }
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas eliminar este restaurante?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: async () => {
            setIsLoading(true);
            await handleDelete();
            setIsLoading(false);
            Alert.alert('Éxito', 'Restaurante eliminado');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{state.id === 0 ? 'Crear Restaurante' : 'Editar Restaurante'}</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del restaurante"
              value={state.nombre}
              onChangeText={(value: string) => handleInputChange('nombre', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección del restaurante"
              value={state.direccion}
              onChangeText={(value: string) => handleInputChange('direccion', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono del restaurante"
              value={state.telefono}
              onChangeText={(value: string) => handleInputChange('telefono', value)}
              editable={!isLoading}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gerente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del gerente"
              value={state.gerente}
              onChangeText={(value: string) => handleInputChange('gerente', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Horario</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 10:00 - 22:00"
              value={state.horario}
              onChangeText={(value: string) => handleInputChange('horario', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Capacidad</Text>
            <TextInput
              style={styles.input}
              placeholder="Capacidad de mesas"
              value={state.capacidad.toString()}
              onChangeText={(value: string) => handleInputChange('capacidad', parseInt(value) || 0)}
              editable={!isLoading}
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.submitButton, isLoading && styles.buttonDisabled]}
            onPress={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {state.id === 0 ? 'Crear' : 'Actualizar'}
              </Text>
            )}
          </TouchableOpacity>

          {state.id !== 0 && (
            <TouchableOpacity
              style={[styles.button, styles.deleteButton, isLoading && styles.buttonDisabled]}
              onPress={onDelete}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
