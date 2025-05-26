import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import generalStyles from "../../styles/global";
import registerStyles from "../../styles/register";
import { useNavigation } from "@react-navigation/native";
import { useAccount, useRegister } from "../../services/auth";
import Toast from "react-native-toast-message";
import SecureStoreManager from "../../components/AsyncStorageManager";
import { useUser } from "../../context/UserContext";
import errorToast from "../../components/ui/ErrorToast";
import { RegisterFormData } from "../../types";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const { login } = useUser();
  const registerMutate = useRegister();
  const { refetch } = useAccount();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      lastName: "",
      idNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    registerMutate.mutate(data,
      {
        onSuccess: async (response) => {
          await SecureStoreManager.setItem<string>("Token", response.token);
          const user = await refetch();
          if (user.data) {
            login(user.data);
            Toast.show({
              type: 'success',
              text1: t("auth.registerSuccessTitle"),
              text2: t("auth.registerSuccessMessage")
            });
          } else {
            Toast.show({
              type: 'error',
              text1: t("auth.registerErrorTitle"),
              text2: t("auth.registerErrorMessage")
            });
          }
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: t("auth.registerErrorTitle"),
            text2: `${errorToast(error)}`
          });
          console.log('Error al registrarse:', error)
        },
      }
    );
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
            rules={{
              required: t("register.nameRequired"),
            }}
            render={({ field }) => (
              <TextInput
                label={t("register.name")}
                placeholder={t("register.namePlaceholder")}
                autoCapitalize="words"
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
          {errors.name && <Text style={generalStyles.errorText}>{errors.name.message}</Text>}
        </View>

        {/* Apellido */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("register.lastName")}
                autoCapitalize="words"
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
            rules={{
              required: t("register.idNumberRequired"),
            }}
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
          {errors.idNumber && <Text style={generalStyles.errorText}>{errors.idNumber.message}</Text>}
        </View>

        {/* Correo */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: t("register.emailRequired"),
            }}
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
          {errors.email && <Text style={generalStyles.errorText}>{errors.email.message}</Text>}
        </View>

        {/* Clave */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: t("register.passwordRequired"),
              minLength: {
                value: 7,
                message: t("register.passwordMinLength"),
              },
            }}
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
          {errors.password && <Text style={generalStyles.errorText}>{errors.password.message}</Text>}
        </View>

        {/* Repetir Clave */}
        <View style={registerStyles.formGroup}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: t("register.passwordRequired"),
              validate: (value) =>
                value === password || t("register.passwordMismatchMessage"),
            }}
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
          {errors.confirmPassword && (
            <Text style={generalStyles.errorText}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        {/* Botón de registro */}
        <Button
          mode="contained"
          loading={registerMutate.isPending}
          onPress={handleSubmit(onSubmit)} style={registerStyles.button}
        >
          {t("register.registerButton")}
        </Button>

        {/* Volver al login */}
        <Text style={registerStyles.registerPrompt}>
          {t("register.haveAccount")}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[registerStyles.registerLink, { marginLeft: 8 }]}>{t("register.loginLink")}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Register;