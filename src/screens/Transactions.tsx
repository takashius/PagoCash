import { View, StyleSheet } from 'react-native';
import React from 'react';
import TransactionList from '../components/TransactionList';

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  description: string;
  date: string;
}

export default function Transactions() {
  const mockTransactions = [
    {
      id: "tx1",
      type: "incoming",
      amount: 500,
      description: "Pago de Juan Pérez",
      date: "2023-06-12T14:30:00",
    },
    {
      id: "tx2",
      type: "outgoing",
      amount: 120.5,
      description: "Pago a Tienda ABC",
      date: "2023-06-10T09:15:00",
    },
    {
      id: "tx3",
      type: "incoming",
      amount: 350,
      description: "Transferencia de Ana López",
      date: "2023-06-05T16:45:00",
    },
    {
      id: "tx4",
      type: "outgoing",
      amount: 75.25,
      description: "Compra en Farmacia XYZ",
      date: "2023-06-01T11:20:00",
    },
  ];

  return (
    <View style={styles.scrollContainer}>
      <TransactionList transactions={mockTransactions as Transaction[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
})