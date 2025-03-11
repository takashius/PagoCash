import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

const QRCode = ({ accountId, name }: { accountId: string; name: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrImage, setQrImage] = useState<string | null>(null);
  console.log('DATA', accountId, name)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQrImage(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          `PAGOCASH:${accountId}:${name}`
        )}`
      );
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [accountId, name]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi código QR</Text>
      <View style={styles.card}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFC107" />
        ) : (
          <Image
            source={{ uri: qrImage || "" }} // Proporciona una cadena vacía si qrImage es null
            style={styles.qrImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{name}</Text>
        <Text style={styles.accountId}>{accountId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  qrImage: {
    width: 180,
    height: 180,
  },
  accountInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  accountId: {
    fontSize: 14,
    color: "#888",
  },
});

export default QRCode;
