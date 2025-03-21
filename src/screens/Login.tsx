import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Checkbox } from "../components/ui/checkbox";
import { CustomButton } from "../components/ui/custom-button";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    setIsLoading(true);

    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false);
      login({
        email: "takashi.onimaru@gmail.com",
        name: 'Usuario Ejemplo',
        token: 'fake-token',
      });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Bienvenido de nuevo</Text>
        <Text style={styles.subtitle}>
          Inicia sesión para continuar con Pago Cash
        </Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        {/* Usuario o Correo */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Usuario o Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario o correo"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Contraseña */}
        <View style={styles.formGroup}>
          <View style={styles.passwordHeader}>
            <Text style={styles.label}>Contraseña</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Recordarme */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={styles.checkboxLabel}>Recordarme</Text>
        </View>

        {/* Botón de inicio de sesión */}
        <CustomButton onPress={handleLogin} loading={isLoading}>
          Iniciar Sesión
        </CustomButton>

        {/* Alternar a registro */}
        <Text style={styles.registerPrompt}>
          ¿No tienes una cuenta?{" "}
          <TouchableOpacity>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#007bff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  registerPrompt: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginTop: 20,
  },
  registerLink: {
    color: "#007bff",
    fontWeight: "bold"
  },
});
