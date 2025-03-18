import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from "@expo/vector-icons";
import TransactionList from '../components/TransactionList';

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  description: string;
  date: string;
}

export default function HomeScreen() {
  const [balance, setBalance] = useState(1250.75);
  const [showQR, setShowQR] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.dashboard}>
          <Text style={styles.balanceLabel}>Mi saldo</Text>
          <Text style={styles.balance}>
            Bs. {balance.toFixed(2)}
          </Text>
          <Text style={styles.accountNumber}>
            Número de cuenta: PC-123456
          </Text>

          <View style={styles.cardGrid}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => alert("Función de recarga no implementada")}
            >
              <Feather
                name="credit-card"
                size={24}
                color="#333"
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>Recargar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => alert("Función de escaneo no implementada")}
            >
              <Feather
                name="search"
                size={24}
                color="#333"
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>Escanear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => setShowQR(true)}
            >
              <Feather
                name="camera"
                size={24}
                color="#333"
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>Mi QR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                alert("Función de transferencia no implementada")
              }
            >
              <Feather
                name="arrow-right"
                size={24}
                color="#333"
                style={styles.cardIcon}
              />
              <Text style={styles.cardText}>Transferir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scrollContainer}>
            <TransactionList transactions={mockTransactions.slice(0, 3) as Transaction[]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F9F9F9",
  },
  scrollContainer: {
    flex: 1,
  },
  dashboard: {
    flex: 1,
    padding: 20,
  },
  balanceLabel: {
    textAlign: "center",
    color: "#555",
  },
  balance: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  accountNumber: {
    textAlign: "center",
    color: "#777",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  card: {
    width: "48%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
