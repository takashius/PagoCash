import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Snackbar, Card } from "react-native-paper";
import { Send, Search, User, MessageSquare } from "lucide-react-native";
import ContactSelector from "../components/ui/contact-selector";
import generalStyles from "../styles/global";
import transferStyles from "../styles/transfer";
import { useTranslation } from "react-i18next";

interface Contact {
  id: string;
  name: string;
  accountId: string;
}

const TransferScreen: React.FC = () => {
  const { t } = useTranslation();
  const [currentBalance, setCurrentBalance] = useState<number>(1000.0);
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
    <ScrollView style={generalStyles.containerTop}>
      <View style={transferStyles.inputGroup}>
        <Text style={transferStyles.label}>{t('transfer.transferAmount')}</Text>
        <View style={transferStyles.inputWrapper}>
          <Text style={transferStyles.inputPrefix}>Bs.</Text>
          <TextInput
            style={generalStyles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            textAlign="right"
          />
        </View>
        <Text style={transferStyles.balanceInfo}>
          {t('transfer.availableBalance')}: <Text style={transferStyles.balance}>Bs. {currentBalance.toFixed(2)}</Text>
        </Text>
      </View>

      <View style={transferStyles.inputGroup}>
        <Text style={transferStyles.label}>{t('transfer.transferMethod')}</Text>
        <View style={transferStyles.paymentMethods}>
          <TouchableOpacity
            style={[
              transferStyles.paymentMethod,
              transferMethod === "contact" && transferStyles.selectedMethod,
            ]}
            onPress={() => {
              setTransferMethod("contact");
              setRecipient("");
              setSelectedContact("");
            }}
          >
            <User size={24} color="#333" />
            <Text style={transferStyles.methodText}>{t('transfer.contact')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              transferStyles.paymentMethod,
              transferMethod === "account" && transferStyles.selectedMethod,
            ]}
            onPress={() => {
              setTransferMethod("account");
              setRecipient("");
            }}
          >
            <Search size={24} color="#333" />
            <Text style={transferStyles.methodText}>{t('transfer.contact')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {transferMethod === "contact" ? (
        <View style={transferStyles.inputGroup}>
          <ContactSelector contacts={mockContacts} onSelect={handleSelectContact} />
        </View>
      ) : (
        <View style={transferStyles.inputGroup}>
          <Text style={transferStyles.label}>{t('transfer.accountNumber')}</Text>
          <TextInput
            style={generalStyles.input}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="PC-123456"
          />
        </View>
      )}

      <View style={transferStyles.inputGroup}>
        <View style={{ flexDirection: "row" }}>
          <MessageSquare size={24} color="#333" />
          <Text style={[transferStyles.label, { marginLeft: 8 }]}>{t('transfer.optionalMessage')}</Text>
        </View>
        <TextInput
          style={generalStyles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={t('transfer.writeRecipientMessage')}
        />
      </View>

      {amount && recipient && (
        <Card style={transferStyles.summaryCard}>
          <Card.Content>
            <Text style={transferStyles.summaryTitle}>{t('transfer.transferSummary')}</Text>
            <Text style={transferStyles.summaryText}>
              <Text style={transferStyles.summaryLabel}>{t('general.amount')}: </Text>
              Bs. {parseFloat(amount).toFixed(2)}
            </Text>
            <Text style={transferStyles.summaryText}>
              <Text style={transferStyles.summaryLabel}>{t('transfer.recipient')}: </Text>
              {recipient}
            </Text>
            {message ? (
              <Text style={transferStyles.summaryText}>
                <Text style={transferStyles.summaryLabel}>{t('general.message')}: </Text>
                {message}
              </Text>
            ) : null}
          </Card.Content>
        </Card>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={transferStyles.primaryButton}
        contentStyle={transferStyles.buttonContent} // Estilo para la disposición
        disabled={!amount || !recipient}
      >
        <View style={transferStyles.iconAndTextWrapper}>
          <Text style={transferStyles.primaryButtonText}>{t('transfer.confirmTransfer')}</Text>
          <Send size={20} color="#fff" style={transferStyles.iconStyle} />
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

export default TransferScreen;
