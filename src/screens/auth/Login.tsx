import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { useUser } from "../../context/UserContext";
import generalStyles from "../../styles/global";
import loginStyles from "../../styles/login";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const { login } = useUser();
  const { control, handleSubmit, setValue } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    if (!data.username || !data.password) {
      alert("Error: Por favor complete todos los campos.");
      return;
    }

    setTimeout(() => {
      login({
        email: "takashi.onimaru@gmail.com",
        name: "Usuario Ejemplo",
        token: "fake-token",
      });
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      {/* Encabezado */}
      <View style={generalStyles.header}>
        <Image source={require("../../../assets/logo.png")} style={loginStyles.logo} />
        <Text style={generalStyles.title}>{t("general.welcome")}</Text>
        <Text style={loginStyles.subtitle}>{t("login.login_to_continue")}</Text>
      </View>

      {/* Formulario con Scroll */}
      <ScrollView style={loginStyles.form} showsVerticalScrollIndicator={false}>
        {/* Usuario o Correo */}
        <View style={loginStyles.formGroup}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("login.userOrEmail")}
                placeholder={t("login.usernamePlaceholder")}
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Contraseña */}
        <View style={loginStyles.formGroup}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("login.passwordLabel")}
                placeholder={t("login.passwordPlaceholder")}
                secureTextEntry={!isPasswordVisible}
                value={field.value}
                onChangeText={field.onChange}
                style={loginStyles.passwordInput}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />
            )}
          />
        </View>

        {/* Recordarme y Forgot Password en la misma estructura */}
        <View style={loginStyles.optionsContainer}>
          {/* Checkbox Recordarme */}
          <View style={loginStyles.checkboxContainer}>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  status={field.value ? "checked" : "unchecked"}
                  onPress={() => setValue("rememberMe", !field.value)}
                  color="#007BFF"
                />
              )}
            />
            <Text style={loginStyles.checkboxLabel}>{t("login.rememberMe")}</Text>
          </View>

          {/* Forgot Password alineado a la derecha */}
          <TouchableOpacity onPress={() => navigation.navigate("PasswordRecoveryOne")}>
            <Text style={loginStyles.forgotPassword}>{t("login.forgotPassword")}</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de inicio de sesión */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={loginStyles.button}>
          {t("login.loginButton")}
        </Button>

        {/* Alternar a registro */}
        <Text style={loginStyles.registerPrompt}>
          {t("login.noAccount")}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[loginStyles.registerLink, { marginLeft: 8 }]}>{t("login.signUp")}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;