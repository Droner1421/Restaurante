import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Pedido, Platillo } from '../interfaces/restauranteInterface';

interface PlatilloConPedidosItemProps {
  item: {
    platillo: Platillo;
    pedidos: Pedido[];
  };
}

export const PlatilloConPedidosItem: React.FC<PlatilloConPedidosItemProps> = ({ item }) => {
  const { platillo, pedidos } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{platillo?.nombre ?? 'Sin nombre'}</Text>
      <Text style={styles.categoria}>Categoría: {platillo?.categoria ?? 'Sin categoría'}</Text>
      <Text style={styles.precio}>Precio: {platillo?.precio ? (typeof platillo.precio === 'number' ? `$${platillo.precio.toFixed(2)}` : (typeof platillo.precio === 'string' && !isNaN(Number(platillo.precio)) ? `$${Number(platillo.precio).toFixed(2)}` : platillo.precio)) : 'Sin precio'}</Text>
      <Text style={styles.descripcion}>Descripción: {platillo?.descripcion ?? 'Sin descripción'}</Text>
      <Text style={styles.disponible}>Disponible: {platillo?.disponible === true ? 'Sí' : platillo?.disponible === false ? 'No' : 'Sin dato'}</Text>
      <Text style={styles.pedidosTitle}>Pedidos ({Array.isArray(pedidos) ? pedidos.length : 0}):</Text>
      {Array.isArray(pedidos) && pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(pedido, idx) => pedido.id_pedido?.toString() ?? pedido.id?.toString() ?? idx.toString()}
          scrollEnabled={false}
          renderItem={({ item: pedido }) => (
            <View style={styles.pedidoContainer}>
              <Text style={styles.pedidoItem}>
                • Pedido #{pedido.id_pedido ?? pedido.id ?? 'N/A'} - Mesa: {pedido.mesa ?? 'N/A'}
              </Text>
              <Text style={styles.pedidoItem}>
                Estatus: {pedido.estatus ?? pedido.estado ?? 'Sin estatus'}
              </Text>
              <Text style={styles.pedidoItem}>
                Total: {pedido.total ? (typeof pedido.total === 'number' ? `$${pedido.total.toFixed(2)}` : (typeof pedido.total === 'string' && !isNaN(Number(pedido.total)) ? `$${Number(pedido.total).toFixed(2)}` : pedido.total)) : 'Sin total'}
              </Text>
              <Text style={styles.pedidoItem}>
                Fecha: {pedido.fecha ?? 'Sin fecha'} {pedido.hora ? `- ${pedido.hora}` : ''}
              </Text>
              <Text style={styles.pedidoItem}>
                Método de pago: {pedido.metodo_pago ?? 'Sin dato'}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.pedidoItem}>No hay pedidos para este platillo</Text>
      )}
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
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  disponible: {
    fontSize: 14,
    color: '#008000',
    marginBottom: 2,
  },
  pedidosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  pedidoItem: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  pedidoContainer: {
    marginLeft: 8,
    marginTop: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
  },
});
