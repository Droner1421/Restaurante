import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormRestaurante } from '../hooks/useFormRestaurante';
import { usePlatillosRestaurante } from '../hooks/usePlatillosRestaurante';
import { usePedidosRestaurante } from '../hooks/usePedidosRestaurante';

export const RestauranteDetailScreen: React.FC<any> = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { state, handleInputChange, handleSubmit, handleDelete, loadRestaurante } = useFormRestaurante();
  const [restauranteId, setRestauranteId] = React.useState<number>(0);
  const { state: platillosState, handleCreate: handleCreatePlatillo, handleUpdate: handleUpdatePlatillo, handleDelete: handleDeletePlatillo, handleLoad: handleLoadPlatillos } = usePlatillosRestaurante(restauranteId);
  const { state: pedidosState, handleCreate: handleCreatePedido, handleUpdate: handleUpdatePedido, handleDelete: handleDeletePedido, handleLoad: handleLoadPedidos } = usePedidosRestaurante(restauranteId);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPlatilloForm, setShowPlatilloForm] = React.useState(false);
  const [showPedidoForm, setShowPedidoForm] = React.useState(false);
  const [newPlatillo, setNewPlatillo] = React.useState({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true });
  const [newPedido, setNewPedido] = React.useState({ fecha: '', mesa: '', metodo_pago: '', total: '', estado: 'Pendiente' });
  const [editingPlatillo, setEditingPlatillo] = React.useState<any>(null);
  const [editingPedido, setEditingPedido] = React.useState<any>(null);

  React.useEffect(() => {
    if (route.params?.restaurante) {
      const id = route.params.restaurante.id || route.params.restaurante.id_restaurante || 0;
      setRestauranteId(id);
      loadRestaurante(route.params.restaurante);
    }
  }, [route.params?.restaurante]);

  React.useEffect(() => {
    if (restauranteId > 0) {
      handleLoadPlatillos(restauranteId);
      handleLoadPedidos(restauranteId);
    }
  }, [restauranteId]);

  const onSubmitRestaurante = async () => {
    if (!state.nombre || !state.direccion || !state.telefono) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
    Alert.alert('Éxito', 'Restaurante actualizado');
  };

  const onDeleteRestaurante = async () => {
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

  const onCreatePlatillo = async () => {
    if (!newPlatillo.nombre || !newPlatillo.precio) {
      Alert.alert('Error', 'Completa nombre y precio');
      return;
    }
    setIsLoading(true);
    await handleCreatePlatillo({
      nombre: newPlatillo.nombre,
      descripcion: newPlatillo.descripcion,
      precio: parseFloat(newPlatillo.precio),
      categoria: newPlatillo.categoria,
      disponible: newPlatillo.disponible,
      restauranteId: state.id,
    });
    setIsLoading(false);
    setNewPlatillo({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true });
    setShowPlatilloForm(false);
    Alert.alert('Éxito', 'Platillo creado');
  };

  const onCreatePedido = async () => {
    if (!newPedido.mesa || !newPedido.total) {
      Alert.alert('Error', 'Completa mesa y total');
      return;
    }
    setIsLoading(true);
    await handleCreatePedido({
      fecha: new Date().toISOString(),
      mesa: parseInt(newPedido.mesa),
      metodo_pago: newPedido.metodo_pago || 'Efectivo',
      total: parseFloat(newPedido.total),
      estado: newPedido.estado,
      restauranteId: state.id,
      platillos: [],
    });
    setIsLoading(false);
    setNewPedido({ fecha: '', mesa: '', metodo_pago: '', total: '', estado: 'Pendiente' });
    setShowPedidoForm(false);
    Alert.alert('Éxito', 'Pedido creado');
  };

  const onEditPlatillo = (platillo: any) => {
    setEditingPlatillo(platillo);
    setNewPlatillo({
      nombre: platillo.nombre,
      descripcion: platillo.descripcion,
      precio: platillo.precio.toString(),
      categoria: platillo.categoria,
      disponible: platillo.disponible,
    });
    setShowPlatilloForm(true);
  };

  const onSaveEditPlatillo = async () => {
    if (!newPlatillo.nombre || !newPlatillo.precio) {
      Alert.alert('Error', 'Completa nombre y precio');
      return;
    }
    setIsLoading(true);
    await handleUpdatePlatillo(editingPlatillo.id_platillo ?? editingPlatillo.id, {
      nombre: newPlatillo.nombre,
      descripcion: newPlatillo.descripcion,
      precio: parseFloat(newPlatillo.precio),
      categoria: newPlatillo.categoria,
      disponible: newPlatillo.disponible,
    });
    setIsLoading(false);
    setEditingPlatillo(null);
    setNewPlatillo({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true });
    setShowPlatilloForm(false);
    Alert.alert('Éxito', 'Platillo actualizado');
  };

  const onEditPedido = (pedido: any) => {
    setEditingPedido(pedido);
    setNewPedido({
      fecha: pedido.fecha || '',
      mesa: pedido.mesa.toString(),
      metodo_pago: pedido.metodo_pago,
      total: pedido.total.toString(),
      estado: pedido.estatus ?? pedido.estado,
    });
    setShowPedidoForm(true);
  };

  const onSaveEditPedido = async () => {
    if (!newPedido.mesa || !newPedido.total) {
      Alert.alert('Error', 'Completa mesa y total');
      return;
    }
    setIsLoading(true);
    await handleUpdatePedido(editingPedido.id_pedido ?? editingPedido.id, {
      fecha: newPedido.fecha,
      mesa: parseInt(newPedido.mesa),
      metodo_pago: newPedido.metodo_pago,
      total: parseFloat(newPedido.total),
      estatus: newPedido.estado,
    });
    setIsLoading(false);
    setEditingPedido(null);
    setNewPedido({ fecha: '', mesa: '', metodo_pago: '', total: '', estado: 'Pendiente' });
    setShowPedidoForm(false);
    Alert.alert('Éxito', 'Pedido actualizado');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Sección Restaurante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Restaurante</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={state.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              value={state.direccion}
              onChangeText={(value) => handleInputChange('direccion', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={state.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gerente</Text>
            <TextInput
              style={styles.input}
              value={state.gerente}
              onChangeText={(value) => handleInputChange('gerente', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Horario</Text>
            <TextInput
              style={styles.input}
              value={state.horario}
              onChangeText={(value) => handleInputChange('horario', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Capacidad</Text>
            <TextInput
              style={styles.input}
              value={state.capacidad.toString()}
              onChangeText={(value) => handleInputChange('capacidad', parseInt(value) || 0)}
              keyboardType="number-pad"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSubmitRestaurante} disabled={isLoading}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>

          {state.id !== 0 && (
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDeleteRestaurante} disabled={isLoading}>
              <Text style={styles.buttonText}>Eliminar Restaurante</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sección Platillos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Platillos</Text>
            {!showPlatilloForm && (
              <TouchableOpacity onPress={() => { setEditingPlatillo(null); setNewPlatillo({ nombre: '', descripcion: '', precio: '', categoria: '', disponible: true }); setShowPlatilloForm(true); }}>
                <Text style={styles.addButton}>+ Agregar</Text>
              </TouchableOpacity>
            )}
          </View>

          {showPlatilloForm && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>{editingPlatillo ? 'Editar Platillo' : 'Nuevo Platillo'}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del platillo"
                  value={newPlatillo.nombre}
                  onChangeText={(value) => setNewPlatillo({...newPlatillo, nombre: value})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción"
                  value={newPlatillo.descripcion}
                  onChangeText={(value) => setNewPlatillo({...newPlatillo, descripcion: value})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Precio</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Precio"
                  value={newPlatillo.precio}
                  onChangeText={(value) => setNewPlatillo({...newPlatillo, precio: value})}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoría</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Categoría"
                  value={newPlatillo.categoria}
                  onChangeText={(value) => setNewPlatillo({...newPlatillo, categoria: value})}
                />
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={editingPlatillo ? onSaveEditPlatillo : onCreatePlatillo}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>{editingPlatillo ? 'Actualizar' : 'Crear'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={() => { setShowPlatilloForm(false); setEditingPlatillo(null); }}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <FlatList
            data={platillosState.platillos}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.nombre}</Text>
                  <Text style={styles.itemDetail}>{item.descripcion}</Text>
                  <Text style={styles.itemPrice}>
                    ${typeof item.precio === 'number' ? item.precio.toFixed(2) : (typeof item.precio === 'string' && !isNaN(Number(item.precio)) ? Number(item.precio).toFixed(2) : '0.00')}
                  </Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => onEditPlatillo(item)}>
                    <Text style={styles.actionButton}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Alert.alert('Confirmar', '¿Eliminar platillo?', [
                      { text: 'Cancelar', onPress: () => {} },
                      { text: 'Eliminar', onPress: () => handleDeletePlatillo(item.id_platillo ?? item.id!) }
                    ]);
                  }}>
                    <Text style={styles.actionButton}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Sección Pedidos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pedidos</Text>
            {!showPedidoForm && (
              <TouchableOpacity onPress={() => { setEditingPedido(null); setNewPedido({ fecha: '', mesa: '', metodo_pago: '', total: '', estado: 'Pendiente' }); setShowPedidoForm(true); }}>
                <Text style={styles.addButton}>+ Agregar</Text>
              </TouchableOpacity>
            )}
          </View>

          {showPedidoForm && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>{editingPedido ? 'Editar Pedido' : 'Nuevo Pedido'}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={newPedido.fecha}
                  onChangeText={(value) => setNewPedido({...newPedido, fecha: value})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mesa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de mesa"
                  value={newPedido.mesa}
                  onChangeText={(value) => setNewPedido({...newPedido, mesa: value})}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Método de Pago</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Tarjeta, Efectivo"
                  value={newPedido.metodo_pago}
                  onChangeText={(value) => setNewPedido({...newPedido, metodo_pago: value})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Total</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Total"
                  value={newPedido.total}
                  onChangeText={(value) => setNewPedido({...newPedido, total: value})}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Estado</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Pendiente, Completado"
                  value={newPedido.estado}
                  onChangeText={(value) => setNewPedido({...newPedido, estado: value})}
                />
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={editingPedido ? onSaveEditPedido : onCreatePedido}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>{editingPedido ? 'Actualizar' : 'Crear'}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={() => { setShowPedidoForm(false); setEditingPedido(null); }}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <FlatList
            data={pedidosState.pedidos}
            keyExtractor={(item) => (item.id_pedido?.toString() ?? item.id?.toString()) || Math.random().toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>Mesa {item.mesa}</Text>
                  <Text style={styles.itemDetail}>{item.metodo_pago} - Estado: {item.estatus ?? item.estado}</Text>
                  <Text style={styles.itemPrice}>
                    ${typeof item.total === 'number' ? item.total.toFixed(2) : (typeof item.total === 'string' && !isNaN(Number(item.total)) ? Number(item.total).toFixed(2) : '0.00')}
                  </Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => onEditPedido(item)}>
                    <Text style={styles.actionButton}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Alert.alert('Confirmar', '¿Eliminar pedido?', [
                      { text: 'Cancelar', onPress: () => {} },
                      { text: 'Eliminar', onPress: () => handleDeletePedido(item.id_pedido ?? item.id!) }
                    ]);
                  }}>
                    <Text style={styles.actionButton}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  section: { padding: 16, marginBottom: 16, backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  addButton: { color: '#4CAF50', fontWeight: 'bold', fontSize: 14 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 4 },
  input: { backgroundColor: '#f9f9f9', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, borderWidth: 1, borderColor: '#ddd' },
  button: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 6, marginTop: 8, alignItems: 'center' },
  saveButton: { backgroundColor: '#4CAF50' },
  deleteButton: { backgroundColor: '#f44336' },
  cancelButton: { backgroundColor: '#999' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  buttonGroup: { flexDirection: 'row', gap: 8, marginTop: 8 },
  formContainer: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 6, marginBottom: 12 },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#222' },
  itemDetail: { fontSize: 12, color: '#999', marginTop: 2 },
  itemPrice: { fontSize: 13, fontWeight: 'bold', color: '#4CAF50', marginTop: 2 },
  itemActions: { flexDirection: 'row', gap: 8 },
  actionButton: { fontSize: 16, padding: 4 },
});
