import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Share } from "react-native";

const QRCode = ({ accountId, name }: { accountId: string; name: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrImage, setQrImage] = useState<string | null>(null);

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

  const shareQrCode = async () => {
    try {
      await Share.share({
        message: `Escanea este código QR para acceder a mi cuenta:\nPAGOCASH:${accountId}:${name}`,
        url: qrImage || "",
      });
    } catch (error) {
      console.log("Error al compartir:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFC107" />
        ) : (
          <Image
            source={{ uri: qrImage || "" }}
            style={styles.qrImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{name}</Text>
        <Text style={styles.accountId}>{accountId}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={shareQrCode}>
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QRCode;
