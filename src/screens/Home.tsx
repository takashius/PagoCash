import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from "@expo/vector-icons";
import TransactionList from '../components/TransactionList';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../styles/global';
import homeStyles from '../styles/home';
import { useTranslation } from 'react-i18next';

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  description: string;
  date: string;
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(1250.75);
  const navigation: any = useNavigation();
  const accountId = "PC-123456";

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
    <SafeAreaView style={generalStyles.container}>
      <View style={generalStyles.scrollContainer}>
        <View style={homeStyles.dashboard}>
          <Text style={homeStyles.balanceLabel}>{t('home.balance')}</Text>
          <Text style={homeStyles.balance}>
            Bs. {balance.toFixed(2)}
          </Text>
          <Text style={homeStyles.accountNumber}>
            {t("home.accountNumber", { accountId })}
          </Text>

          <View style={generalStyles.cardGrid}>
            <TouchableOpacity
              style={generalStyles.card}
              onPress={() => navigation.navigate("Recharge")}
            >
              <Feather
                name="credit-card"
                size={24}
                color="#333"
                style={generalStyles.cardIcon}
              />
              <Text style={generalStyles.cardText}>{t('home.recharge')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={generalStyles.card}
              onPress={() => navigation.navigate("QRScanner")}
            >
              <Feather
                name="search"
                size={24}
                color="#333"
                style={generalStyles.cardIcon}
              />
              <Text style={generalStyles.cardText}>{t('home.scan')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={generalStyles.card}
              onPress={() => navigation.navigate("QR")}
            >
              <Feather
                name="camera"
                size={24}
                color="#333"
                style={generalStyles.cardIcon}
              />
              <Text style={generalStyles.cardText}>{t('home.myQr')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={generalStyles.card}
              onPress={() => navigation.navigate("Transfer")}
            >
              <Feather
                name="arrow-right"
                size={24}
                color="#333"
                style={generalStyles.cardIcon}
              />
              <Text style={generalStyles.cardText}>{t('home.transfer')}</Text>
            </TouchableOpacity>
          </View>

          <View style={generalStyles.scrollContainer}>
            <TransactionList transactions={mockTransactions.slice(0, 3) as Transaction[]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
