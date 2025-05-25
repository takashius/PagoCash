import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import generalStyles from "../../styles/global";
import passwordResetStyles from "../../styles/passwordReset";

interface PasswordResetFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordReset: React.FC = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const { control, handleSubmit, watch } = useForm<PasswordResetFormData>({
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onSubmit = (data: PasswordResetFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      alert(t("passwordReset.passwordMismatch"));
      return;
    }

    // Simular cambio de contraseña
    setTimeout(() => {
      alert(t("passwordReset.success"));
      navigation.navigate("Login");
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      {/* Encabezado */}
      <View style={generalStyles.header}>
        <Image source={require("../../../assets/logo.png")} style={passwordResetStyles.logo} />
        <Text style={generalStyles.title}>{t("passwordReset.title")}</Text>
        <Text style={passwordResetStyles.subtitle}>{t("passwordReset.subtitle")}</Text>
      </View>

      {/* Formulario con Scroll */}
      <ScrollView style={passwordResetStyles.form} showsVerticalScrollIndicator={false}>
        {/* Código de verificación */}
        <View style={passwordResetStyles.formGroup}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("passwordReset.code")}
                placeholder={t("passwordReset.codePlaceholder")}
                keyboardType="numeric"
                maxLength={6}
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Nueva contraseña */}
        <View style={passwordResetStyles.formGroup}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("passwordReset.newPassword")}
                placeholder={t("passwordReset.newPasswordPlaceholder")}
                secureTextEntry={!isPasswordVisible}
                value={field.value}
                onChangeText={field.onChange}
                style={[generalStyles.input, passwordResetStyles.passwordInput]}
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

        {/* Confirmar contraseña */}
        <View style={passwordResetStyles.formGroup}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("passwordReset.confirmPassword")}
                placeholder={t("passwordReset.confirmPasswordPlaceholder")}
                secureTextEntry={!isConfirmPasswordVisible}
                value={field.value}
                onChangeText={field.onChange}
                style={[generalStyles.input, passwordResetStyles.passwordInput]}
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

        {/* Botón de cambiar contraseña */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={passwordResetStyles.button}>
          {t("passwordReset.resetButton")}
        </Button>

        {/* Volver al login */}
        <Text style={passwordResetStyles.backToLogin}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={passwordResetStyles.backToLoginLink}>{t("passwordReset.backToLogin")}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default PasswordReset;