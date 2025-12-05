import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedido } from '../interfaces/restauranteInterface';

interface PedidoItemProps {
  pedido: Pedido;
}

export const PedidoItem: React.FC<PedidoItemProps> = ({ pedido }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.id}>Pedido #{pedido.id_pedido ?? pedido.id ?? 'N/A'}</Text>
      <Text style={styles.fecha}>{pedido.fecha ?? 'Sin fecha'}{pedido.hora ? ` - ${pedido.hora}` : ''}</Text>
      <Text style={styles.mesa}>Mesa: {pedido.mesa ?? 'Sin mesa'}</Text>
      <Text style={styles.metodoPago}>Pago: {pedido.metodo_pago ?? 'Sin método'}</Text>
      <Text style={styles.total}>
        Total: {typeof pedido.total === 'number' ? `$${pedido.total.toFixed(2)}` :
        (typeof pedido.total === 'string' && !isNaN(Number(pedido.total)) ? `$${Number(pedido.total).toFixed(2)}` : 'Sin total')}
      </Text>
      <Text style={pedido.estatus === 'pendiente' ? styles.pendiente : styles.estado}>{pedido.estatus ?? pedido.estado ?? 'Sin estatus'}</Text>
      {pedido.restaurante && pedido.restaurante.nombre && (
        <Text style={styles.restaurante}>Restaurante: {pedido.restaurante.nombre}</Text>
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
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  fecha: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  mesa: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  metodoPago: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  total: {
    fontSize: 15,
    color: '#009688',
    marginTop: 2,
  },
  pendiente: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 4,
  },
  estado: {
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 4,
  },
  restaurante: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
