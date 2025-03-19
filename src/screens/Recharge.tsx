import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Card, Snackbar } from "react-native-paper";
import { Check, AlertTriangle, CreditCard, Building } from "lucide-react-native";

const RechargeScreen: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(1000.0); // Valor ficticio
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "">("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  // Función para mostrar mensajes de error en Snackbar
  const showToast = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const validateForm = (): boolean => {
    if (!amount || parseFloat(amount) <= 0) {
      showToast("Por favor ingresa un monto válido");
      return false;
    }

    if (!paymentMethod) {
      showToast("Por favor selecciona un método de pago");
      return false;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.length < 16) {
        showToast("Por favor ingresa un número de tarjeta válido");
        return false;
      }

      if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        showToast("Por favor ingresa una fecha de expiración válida (MM/YY)");
        return false;
      }

      if (!cvv || cvv.length < 3) {
        showToast("Por favor ingresa un código de seguridad válido");
        return false;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankName) {
        showToast("Por favor selecciona un banco");
        return false;
      }

      if (!referenceNumber) {
        showToast("Por favor ingresa un número de referencia");
        return false;
      }
    }

    return true;
  };

  const handleRechargeComplete = (amount: number) => {
    Alert.alert("Recarga exitosa", `Has recargado Bs. ${amount.toFixed(2)} a tu cuenta.`);
    setCurrentBalance((prevBalance) => prevBalance + amount); // Actualizar saldo
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 1500);
  };

  if (showConfirmation) {
    return (
      <View style={styles.container}>
        <View style={styles.confirmationContainer}>
          <View style={styles.successIcon}>
            <Check size={32} color="#007bff" />
          </View>
          <Text style={styles.successTitle}>¡Recarga exitosa!</Text>
          <Text style={styles.successMessage}>
            Has recargado Bs. {parseFloat(amount).toFixed(2)} a tu cuenta.
          </Text>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Monto: </Text>
              <Text>Bs. {parseFloat(amount).toFixed(2)}</Text>
            </Text>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Método: </Text>
              <Text>
                {paymentMethod === "card" ? "Tarjeta" : "Transferencia bancaria"}
              </Text>
            </Text>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Fecha: </Text>
              <Text>{new Date().toLocaleDateString()}</Text>
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => handleRechargeComplete(parseFloat(amount))}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}
          >
            Continuar
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recargar Saldo</Text>
      <Text style={styles.label}>
        Saldo actual: <Text style={styles.balance}>Bs. {currentBalance.toFixed(2)}</Text>
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Monto a recargar</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputPrefix}>Bs.</Text>
          <TextInput
            style={[styles.input, styles.input_amount]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Método de pago</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "card" && styles.selectedPaymentCard,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <CreditCard size={24} color="#555" />
          <Text style={styles.paymentText}>Tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "bank" && styles.selectedPaymentCard,
          ]}
          onPress={() => setPaymentMethod("bank")}
        >
          <Building size={24} color="#555" />
          <Text style={styles.paymentText}>Banco</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === "card" && (
        <View>
          <Text style={styles.label}>Número de tarjeta</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Fecha de expiración (MM/YY)</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="MM/YY"
          />
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            value={cvv}
            onChangeText={setCvv}
            placeholder="123"
            keyboardType="numeric"
          />
        </View>
      )}

      {paymentMethod === "bank" && (
        <View>
          <Text style={styles.label}>Banco</Text>
          <TextInput
            style={styles.input}
            value={bankName}
            onChangeText={setBankName}
            placeholder="Selecciona un banco"
          />
          <Text style={styles.label}>Número de referencia</Text>
          <TextInput
            style={styles.input}
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            placeholder="Ingresa el número de referencia"
          />
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isProcessing}
        disabled={!amount || !paymentMethod}
        style={styles.primaryButton}
        labelStyle={styles.primaryButtonText}
      >
        Recargar
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

export default RechargeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  balance: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
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
  },
  input_amount: {
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
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentCard: {
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
  selectedPaymentCard: {
    borderColor: "#007bff",
    backgroundColor: "#E9F7EF",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    color: "#555",
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
  },
  confirmationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  successIcon: {
    backgroundColor: "#E9F7EF",
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  detailsRow: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  detailsLabel: {
    fontWeight: "bold",
  },
  snackbar: {
    backgroundColor: "#FF6F61",
  },
});
