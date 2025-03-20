import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function QRScanner({ navigation }: { navigation: any }) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Permisos de la cámara
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No tienes acceso a la cámara</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.buttonOld}>
          <Text style={styles.buttonText}>Solicitar permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Cambiar la cámara (frontal o trasera)
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Manejador para códigos QR escaneados
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true); // Detener el escaneo temporalmente
    Alert.alert("Código QR escaneado", `Datos: ${data}`);
    // Navegar hacia otra pantalla o procesar los datos
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          {/* Botón para alternar la cámara */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Cambiar cámara</Text>
          </TouchableOpacity>

          {scanned && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)} // Permitir escaneo nuevamente
            >
              <Text style={styles.text}>Escanear de nuevo</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOld: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    marginHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
