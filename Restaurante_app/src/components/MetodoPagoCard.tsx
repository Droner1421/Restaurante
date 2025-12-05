import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface MetodoPagoCardProps {
  metodo_pago: string;
  count: number;
  totalSum: number;
}

export const MetodoPagoCard: React.FC<MetodoPagoCardProps> = ({ metodo_pago, count, totalSum }) => {
  const maxCount = 50; 
  const percentage = Math.min((count / maxCount) * 100, 100);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.header}>
        <Text style={styles.metodoText}>{metodo_pago}</Text>
        <Text style={styles.countText}>{count} pedidos</Text>
      </View>
      <Text style={styles.totalText}>Total: ${totalSum.toFixed(2)}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metodoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  countText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});
