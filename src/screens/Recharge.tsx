import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { Check, CreditCard, Building } from "lucide-react-native";
import generalStyles from "../styles/global";
import rechargeStyles from "../styles/recharge";
import { useTranslation } from "react-i18next";

const RechargeScreen: React.FC = () => {
  const { t } = useTranslation();
  const [currentBalance, setCurrentBalance] = useState<number>(1000.0);
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
      <View style={generalStyles.container}>
        <View style={rechargeStyles.confirmationContainer}>
          <View style={rechargeStyles.successIcon}>
            <Check size={32} color="#007bff" />
          </View>
          <Text style={rechargeStyles.successTitle}>{t('recharge.topUpSuccess')}</Text>
          <Text style={rechargeStyles.successMessage}>
            {t("topUpMessage", { amount: parseFloat(amount).toFixed(2) })}
          </Text>

          <View style={rechargeStyles.detailsCard}>
            <Text style={rechargeStyles.detailsRow}>
              <Text style={rechargeStyles.detailsLabel}>{t('general.amount')}: </Text>
              <Text>Bs. {parseFloat(amount).toFixed(2)}</Text>
            </Text>
            <Text style={rechargeStyles.detailsRow}>
              <Text style={rechargeStyles.detailsLabel}>{t('recharge.method')}: </Text>
              <Text>
                {paymentMethod === "card" ? t('recharge.card') : t('recharge.bankTransfer')}
              </Text>
            </Text>
            <Text style={rechargeStyles.detailsRow}>
              <Text style={rechargeStyles.detailsLabel}>{t('date')}: </Text>
              <Text>{new Date().toLocaleDateString()}</Text>
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => handleRechargeComplete(parseFloat(amount))}
            style={rechargeStyles.primaryButton}
            labelStyle={rechargeStyles.primaryButtonText}
          >
            {t('general.continue')}
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={generalStyles.containerTop}>
      <Text style={[generalStyles.title, { marginBottom: 20 }]}>{t('recharge.topUpBalance')}</Text>
      <Text style={rechargeStyles.label}>
        {t('recharge.currentBalance')}: <Text style={rechargeStyles.balance}>Bs. {currentBalance.toFixed(2)}</Text>
      </Text>

      <View style={rechargeStyles.inputGroup}>
        <Text style={rechargeStyles.label}>{t('recharge.topUpAmount')}</Text>
        <View style={rechargeStyles.inputWrapper}>
          <Text style={rechargeStyles.inputPrefix}>Bs.</Text>
          <TextInput
            style={[generalStyles.input, rechargeStyles.input_amount]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={rechargeStyles.label}>{t('recharge.paymentMethod')}</Text>
      <View style={rechargeStyles.paymentMethods}>
        <TouchableOpacity
          style={[
            rechargeStyles.paymentCard,
            paymentMethod === "card" && rechargeStyles.selectedPaymentCard,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <CreditCard size={24} color="#555" />
          <Text style={rechargeStyles.paymentText}>{t('recharge.card')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            rechargeStyles.paymentCard,
            paymentMethod === "bank" && rechargeStyles.selectedPaymentCard,
          ]}
          onPress={() => setPaymentMethod("bank")}
        >
          <Building size={24} color="#555" />
          <Text style={rechargeStyles.paymentText}>{t('general.bank')}</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === "card" && (
        <View>
          <Text style={rechargeStyles.label}>{t('recharge.cardNumber')}</Text>
          <TextInput
            style={generalStyles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
          />
          <Text style={rechargeStyles.label}>{t('recharge.expirationDate')}</Text>
          <TextInput
            style={generalStyles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="MM/YY"
          />
          <Text style={rechargeStyles.label}>CVV</Text>
          <TextInput
            style={generalStyles.input}
            value={cvv}
            onChangeText={setCvv}
            placeholder="123"
            keyboardType="numeric"
          />
        </View>
      )}

      {paymentMethod === "bank" && (
        <View>
          <Text style={rechargeStyles.label}>{t('general.bank')}</Text>
          <TextInput
            style={generalStyles.input}
            value={bankName}
            onChangeText={setBankName}
            placeholder={t('recharge.selectBank')}
          />
          <Text style={rechargeStyles.label}>{t('recharge.referenceNumber')}</Text>
          <TextInput
            style={generalStyles.input}
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            placeholder={t('recharge.enterReferenceNumber')}
          />
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isProcessing}
        disabled={!amount || !paymentMethod}
        style={rechargeStyles.primaryButton}
        labelStyle={rechargeStyles.primaryButtonText}
      >
        {t('general.recharge')}
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