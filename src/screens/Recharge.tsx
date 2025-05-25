import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Snackbar, Modal, Portal } from "react-native-paper";
import { CreditCard, Building, CheckCircle } from "lucide-react-native";
import generalStyles from "../styles/global";
import rechargeStyles from "../styles/recharge";
import { useTranslation } from "react-i18next";

interface RechargeFormData {
  amount: string;
  paymentMethod: "card" | "bank" | "";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
  referenceNumber?: string;
}

const bankList = ["Banco Nacional", "Banco Universal", "Banco Express"];

const RechargeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, watch } = useForm<RechargeFormData>({
    defaultValues: {
      amount: "",
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      referenceNumber: "",
    },
  });

  const [currentBalance, setCurrentBalance] = useState<number>(1000.0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const data = watch();
    if (!data.amount || parseFloat(data.amount) <= 0) {
      showAlert(t("recharge.invalidAmount"), false);
      return false;
    }

    if (!data.paymentMethod) {
      showAlert(t("recharge.selectPaymentMethod"), false);
      return false;
    }

    if (data.paymentMethod === "card") {
      if (!data.cardNumber || data.cardNumber.length < 16) {
        showAlert(t("recharge.invalidCard"), false);
        return false;
      }

      if (!data.expiryDate || !/^\d{2}\/\d{2}$/.test(data.expiryDate)) {
        showAlert(t("recharge.invalidExpiry"), false);
        return false;
      }

      if (!data.cvv || data.cvv.length < 3) {
        showAlert(t("recharge.invalidCvv"), false);
        return false;
      }
    } else if (data.paymentMethod === "bank") {
      if (!data.bankName) {
        showAlert(t("recharge.selectBank"), false);
        return false;
      }

      if (!data.referenceNumber) {
        showAlert(t("recharge.invalidReference"), false);
        return false;
      }
    }

    return true;
  };

  const showAlert = (message: string, success: boolean) => {
    setModalMessage(message);
    setIsSuccess(success);
    setShowModal(true);
  };

  const handleSubmitRecharge = (data: RechargeFormData) => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showAlert(t("recharge.successMessage", { amount: data.amount }), true);
      setCurrentBalance((prevBalance) => prevBalance + parseFloat(data.amount));
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      <ScrollView style={generalStyles.containerTop}>
        <Text style={[generalStyles.title, { marginBottom: 20 }]}>{t("recharge.topUpBalance")}</Text>
        <Text style={rechargeStyles.label}>
          {t("recharge.currentBalance")}: <Text style={rechargeStyles.balance}>Bs. {currentBalance.toFixed(2)}</Text>
        </Text>

        {/* Monto a recargar */}
        <View style={rechargeStyles.inputGroup}>
          <Text style={rechargeStyles.label}>{t("recharge.topUpAmount")}</Text>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextInput
                style={generalStyles.input}
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numeric"
                placeholder="0.00"
              />
            )}
          />
        </View>

        {/* Métodos de pago */}
        <Text style={rechargeStyles.label}>{t("recharge.paymentMethod")}</Text>
        <View style={rechargeStyles.paymentMethods}>
          <TouchableOpacity style={rechargeStyles.paymentCard} onPress={() => setValue("paymentMethod", "card")}>
            <CreditCard size={24} />
            <Text>{t("recharge.card")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={rechargeStyles.paymentCard} onPress={() => setValue("paymentMethod", "bank")}>
            <Building size={24} />
            <Text>{t("recharge.bankTransfer")}</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de tarjeta */}
        {watch("paymentMethod") === "card" && (
          <View>
            <Text style={rechargeStyles.label}>{t("recharge.cardNumber")}</Text>
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <TextInput style={generalStyles.input} value={field.value} onChangeText={field.onChange} keyboardType="numeric" />
              )}
            />
          </View>
        )}

        {/* Formulario de transferencia bancaria */}
        {watch("paymentMethod") === "bank" && (
          <View>
            <Text style={rechargeStyles.label}>{t("recharge.selectBank")}</Text>
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <TextInput style={generalStyles.input} value={field.value} onChangeText={field.onChange} />
              )}
            />
            <Text style={rechargeStyles.label}>{t("recharge.referenceNumber")}</Text>
            <Controller
              name="referenceNumber"
              control={control}
              render={({ field }) => (
                <TextInput style={generalStyles.input} value={field.value} onChangeText={field.onChange} keyboardType="numeric" />
              )}
            />
          </View>
        )}

        {/* Botón de recarga con espacio extra */}
        <View style={{ marginTop: 30 }}>
          <Button mode="contained" onPress={handleSubmit(handleSubmitRecharge)} loading={isProcessing}>
            {t("general.recharge")}
          </Button>
        </View>
      </ScrollView>

      {/* Modal de éxito/error */}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={rechargeStyles.modalContainer}>
          <View style={rechargeStyles.modalContent}>
            <CheckCircle size={40} color={isSuccess ? "#28a745" : "#dc3545"} />
            <Text style={rechargeStyles.modalMessage}>{modalMessage}</Text>
            <Button mode="contained" onPress={() => setShowModal(false)} style={rechargeStyles.modalButton}>
              {t("general.ok")}
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default RechargeScreen;