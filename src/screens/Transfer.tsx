import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Snackbar, Card } from "react-native-paper";
import { Send, Search, User, MessageSquare } from "lucide-react-native";
import ContactSelector from "../components/ui/contact-selector";

interface Contact {
  id: string;
  name: string;
  accountId: string;
}

const TransferScreen: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(1000.0); // Saldo ficticio
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [transferMethod, setTransferMethod] = useState<string>("contact");
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  // Lista de contactos simulada
  const mockContacts: Contact[] = [
    { id: "1", name: "Juan Pérez", accountId: "PC-654321" },
    { id: "2", name: "Ana López", accountId: "PC-789012" },
    { id: "3", name: "Carlos Mendoza", accountId: "PC-345678" },
    { id: "4", name: "Sofía Rodríguez", accountId: "PC-901234" },
  ];

  const handleSelectContact = (contact: Contact) => {
    Alert.alert("Contacto seleccionado", `Nombre: ${contact.name}`);
  };

  const showToast = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const validateTransfer = (): boolean => {
    const numAmount = parseFloat(amount);

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      showToast("Por favor ingresa un monto válido");
      return false;
    }

    if (numAmount > currentBalance) {
      showToast("No tienes saldo suficiente para esta transferencia");
      return false;
    }

    if (!recipient) {
      showToast("Por favor selecciona un destinatario");
      return false;
    }

    return true;
  };

  const handleTransferComplete = (amount: number, recipient: string) => {
    Alert.alert(
      "Transferencia exitosa",
      `Has transferido Bs. ${amount.toFixed(2)} a ${recipient}.`
    );
    setCurrentBalance((prevBalance) => prevBalance - amount); // Actualizar saldo
  };

  const handleSubmit = () => {
    if (validateTransfer()) {
      handleTransferComplete(parseFloat(amount), recipient);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monto a transferir</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputPrefix}>Bs.</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            textAlign="right"
          />
        </View>
        <Text style={styles.balanceInfo}>
          Saldo disponible: <Text style={styles.balance}>Bs. {currentBalance.toFixed(2)}</Text>
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Método de transferencia</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              transferMethod === "contact" && styles.selectedMethod,
            ]}
            onPress={() => {
              setTransferMethod("contact");
              setRecipient("");
              setSelectedContact("");
            }}
          >
            <User size={24} color="#333" />
            <Text style={styles.methodText}>Contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              transferMethod === "account" && styles.selectedMethod,
            ]}
            onPress={() => {
              setTransferMethod("account");
              setRecipient("");
            }}
          >
            <Search size={24} color="#333" />
            <Text style={styles.methodText}>Número de cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {transferMethod === "contact" ? (
        <View style={styles.inputGroup}>
          <ContactSelector contacts={mockContacts} onSelect={handleSelectContact} />
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Número de cuenta</Text>
          <TextInput
            style={styles.input}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="PC-123456"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <View style={{ flexDirection: "row" }}>
          <MessageSquare size={24} color="#333" />
          <Text style={[styles.label, { marginLeft: 8 }]}>Mensaje (opcional)</Text>
        </View>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje para el destinatario"
        />
      </View>

      {amount && recipient && (
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.summaryTitle}>Resumen de transferencia</Text>
            <Text style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Monto: </Text>
              Bs. {parseFloat(amount).toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Destinatario: </Text>
              {recipient}
            </Text>
            {message ? (
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Mensaje: </Text>
                {message}
              </Text>
            ) : null}
          </Card.Content>
        </Card>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.primaryButton}
        contentStyle={styles.buttonContent} // Estilo para la disposición
        disabled={!amount || !recipient}
      >
        <View style={styles.iconAndTextWrapper}>
          <Text style={styles.primaryButtonText}>Confirmar transferencia</Text>
          <Send size={20} color="#fff" style={styles.iconStyle} />
        </View>
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    width: "100%",
    textAlign: "right",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPrefix: {
    position: "absolute",
    left: 10,
    fontSize: 16,
    color: "#555",
  },
  balanceInfo: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  balance: {
    fontWeight: "bold",
    color: "#007bff",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethod: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedMethod: {
    borderColor: "#007bff",
    backgroundColor: "#E9F7EF",
  },
  methodText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    color: "#555",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  contactDetails: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactAccount: {
    fontSize: 14,
    color: "#777",
  },
  summaryCard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  summaryLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconAndTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 8,
  },
});

export default TransferScreen;
