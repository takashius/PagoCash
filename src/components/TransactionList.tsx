import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Para usar los íconos ArrowDown y ArrowUp
import { format } from "date-fns";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={[styles.card, item.type === "incoming" ? styles.incomingBorder : styles.outgoingBorder]}>
      <View style={styles.cardContent}>
        {/* Icono */}
        <View
          style={[
            styles.iconContainer,
            item.type === "incoming" ? styles.incomingBackground : styles.outgoingBackground,
          ]}
        >
          {item.type === "incoming" ? (
            <Feather name="arrow-down" size={20} color="green" />
          ) : (
            <Feather name="arrow-up" size={20} color="#333" />
          )}
        </View>

        {/* Descripción y Fecha */}
        <View style={styles.textContainer}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {format(new Date(item.date), "dd/MM/yyyy • HH:mm")}
          </Text>
        </View>

        {/* Monto */}
        <View style={styles.amountContainer}>
          <Text
            style={
              item.type === "incoming" ? styles.incomingText : styles.outgoingText
            }
          >
            {item.type === "incoming" ? "+" : "-"} Bs. {item.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay movimientos registrados</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          nestedScrollEnabled={true}
        />
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: "#F9F9F9",
  },
  list: {
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para sombra en Android
  },
  incomingBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "green",
  },
  outgoingBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "#333",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  incomingBackground: {
    backgroundColor: "#DFF6DD",
  },
  outgoingBackground: {
    backgroundColor: "#FFF3E0",
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  incomingText: {
    color: "green",
  },
  outgoingText: {
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
