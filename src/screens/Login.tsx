import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Checkbox } from "../components/ui/checkbox";
import { CustomButton } from "../components/ui/custom-button";
import { useUser } from "../context/UserContext";
import generalStyles from "../styles/global";
import loginStyles from "../styles/login";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
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
    <View style={generalStyles.container}>
      {/* Encabezado */}
      <View style={generalStyles.header}>
        <Image source={require("../../assets/logo.png")} style={loginStyles.logo} />
        <Text style={generalStyles.title}>{t('general.welcome')}</Text>
        <Text style={loginStyles.subtitle}>
          {t('login.login_to_continue')}
        </Text>
      </View>

      {/* Formulario */}
      <View style={loginStyles.form}>
        {/* Usuario o Correo */}
        <View style={loginStyles.formGroup}>
          <Text style={loginStyles.label}>{t('login.userOrEmail')}</Text>
          <TextInput
            style={generalStyles.input}
            placeholder={t('login.usernamePlaceholder')}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Contraseña */}
        <View style={loginStyles.formGroup}>
          <View style={loginStyles.passwordHeader}>
            <Text style={loginStyles.label}>{t('login.passwordLabel')}</Text>
            <TouchableOpacity>
              <Text style={loginStyles.forgotPassword}>{t('login.forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={generalStyles.input}
            placeholder={t('login.passwordPlaceholder')}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Recordarme */}
        <View style={loginStyles.checkboxContainer}>
          <Checkbox
            checked={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={loginStyles.checkboxLabel}>{t('login.rememberMe')}</Text>
        </View>

        {/* Botón de inicio de sesión */}
        <CustomButton onPress={handleLogin} loading={isLoading}>
          {t('login.loginButton')}
        </CustomButton>

        {/* Alternar a registro */}
        <Text style={loginStyles.registerPrompt}>
          {t('login.noAccount')}
          <TouchableOpacity>
            <Text style={[loginStyles.registerLink, { marginLeft: 8 }]}>Regístrate</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Login;
