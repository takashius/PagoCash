import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import generalStyles from "../../styles/global";
import registerStyles from "../../styles/register";

interface RegisterFormData {
  name: string;
  lastName: string;
  idNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      lastName: "",
      idNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de envío de datos
    setTimeout(() => {
      alert("Registro exitoso 🎉");
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      {/* Encabezado */}
      <View style={generalStyles.header}>
        <Image source={require("../../../assets/logo.png")} style={registerStyles.logo} />
        <Text style={generalStyles.title}>{t("register.createAccount")}</Text>
      </View>

      {/* Formulario con Scroll */}
      <ScrollView style={registerStyles.form} showsVerticalScrollIndicator={false}>
        {/* Nombre */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.name")}
                placeholder={t("register.namePlaceholder")}
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Apellido */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.lastName")}
                placeholder={t("register.lastNamePlaceholder")}
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Cédula */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="idNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.idNumber")}
                placeholder={t("register.idNumberPlaceholder")}
                keyboardType="numeric"
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Correo */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.email")}
                placeholder={t("register.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Clave */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.password")}
                placeholder={t("register.passwordPlaceholder")}
                secureTextEntry={!isPasswordVisible}
                value={field.value}
                onChangeText={field.onChange}
                style={[generalStyles.input, registerStyles.passwordInput]}
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

        {/* Repetir Clave */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.confirmPassword")}
                placeholder={t("register.confirmPasswordPlaceholder")}
                secureTextEntry={!isConfirmPasswordVisible}
                value={field.value}
                onChangeText={field.onChange}
                style={[generalStyles.input, registerStyles.passwordInput]}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  />
                }
              />
            )}
          />
        </View>

        {/* Botón de registro */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={registerStyles.button}>
          {t("register.registerButton")}
        </Button>

        {/* Volver al login */}
        <Text style={registerStyles.registerPrompt}>
          {t("register.haveAccount")}
          <TouchableOpacity>
            <Text style={[registerStyles.registerLink, { marginLeft: 8 }]}>{t("register.loginLink")}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Register;