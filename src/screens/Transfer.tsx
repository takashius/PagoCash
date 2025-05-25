import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Modal, Portal, Card, Avatar, IconButton } from "react-native-paper";
import { Send, Search, User } from "lucide-react-native";
import generalStyles from "../styles/global";
import transferStyles from "../styles/transfer";
import { useTranslation } from "react-i18next";

interface TransferFormData {
  amount: string;
  recipient: string;
  message?: string;
}

interface Contact {
  id: string;
  name: string;
  lastName: string;
  accountId: string;
  email: string;
  photo: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Juan", lastName: "Pérez", accountId: "PC-654321", email: "juan@email.com", photo: "https://via.placeholder.com/100" },
  { id: "2", name: "Ana", lastName: "López", accountId: "PC-789012", email: "ana@email.com", photo: "https://via.placeholder.com/100" },
  { id: "3", name: "Carlos", lastName: "Mendoza", accountId: "PC-345678", email: "carlos@email.com", photo: "https://via.placeholder.com/100" },
];

const TransferScreen: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, watch } = useForm<TransferFormData>({
    defaultValues: { amount: "", recipient: "", message: "" },
  });

  const [currentBalance, setCurrentBalance] = useState<number>(1000.0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.accountId.includes(searchQuery)
  );

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setValue("recipient", contact.accountId);
  };

  const handleTransfer = (data: TransferFormData) => {
    const amount = parseFloat(data.amount);
    if (amount <= 0 || amount > currentBalance) {
      setModalMessage(t("transfer.insufficientFunds"));
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setCurrentBalance((prevBalance) => prevBalance - amount);
      setModalMessage(t("transfer.successMessage", { amount }));
      setIsSuccess(true);
      setShowModal(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      <ScrollView style={generalStyles.containerTop}>
        <Text style={[generalStyles.title, { marginBottom: 20 }]}>{t("transfer.title")}</Text>

        {/* Monto a transferir */}
        <View style={transferStyles.inputGroup}>
          <Text style={transferStyles.label}>{t("transfer.transferAmount")}</Text>
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

        {/* Campo de búsqueda con icono de lupa */}
        <Text style={transferStyles.label}>{t("transfer.searchRecipient")}</Text>
        <View style={transferStyles.searchContainer}>
          <TextInput
            style={transferStyles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("transfer.enterAccountOrName")}
          />
          <IconButton icon="magnify" size={24} style={transferStyles.searchIcon} />
        </View>

        {/* Listado horizontal de contactos */}
        <FlatList
          horizontal
          data={mockContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectContact(item)} style={transferStyles.contactItem}>
              <Avatar.Image size={40} source={{ uri: item.photo }} />
              <View style={transferStyles.contactDetails}>
                <Text style={transferStyles.contactName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Información del contacto seleccionado */}
        {selectedContact && (
          <Card style={transferStyles.selectedContactCard}>
            <Card.Title title={`${selectedContact.name} ${selectedContact.lastName}`} subtitle={selectedContact.email} left={() => <Avatar.Image size={50} source={{ uri: selectedContact.photo }} />} />
          </Card>
        )}

        {/* Mensaje opcional */}
        <Text style={transferStyles.label}>{t("transfer.optionalMessage")}</Text>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextInput
              style={generalStyles.input}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={field.value}
              onChangeText={field.onChange}
              placeholder={t("transfer.writeRecipientMessage")}
            />
          )}
        />

        {/* Botón de transferencia */}
        <View style={{ marginTop: 30 }}>
          <Button mode="contained" onPress={handleSubmit(handleTransfer)} loading={isProcessing}>
            {t("transfer.confirmTransfer")}
          </Button>
        </View>
      </ScrollView>

      {/* Modal de éxito/error */}
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={transferStyles.modalContainer}>
          <Text style={transferStyles.modalMessage}>{modalMessage}</Text>
          <Button mode="contained" onPress={() => setShowModal(false)} style={transferStyles.modalButton}>
            {t("general.ok")}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default TransferScreen;