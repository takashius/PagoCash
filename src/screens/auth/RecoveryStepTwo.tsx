import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import generalStyles from "../../styles/global";
import passwordResetStyles from "../../styles/passwordReset";
import { useRecoveryTwo } from "../../services/auth";
import Toast from "react-native-toast-message";
import errorToast from "../../components/ui/ErrorToast";

interface PasswordResetFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface VerificationStepProps {
  route: any;
  navigation: any;
}

const PasswordReset: React.FC<VerificationStepProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { email } = route.params;
  const recoveryMutate = useRecoveryTwo();
  const { control, handleSubmit, watch } = useForm<PasswordResetFormData>({
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const newPassword = watch("newPassword");

  const onSubmit = (data: PasswordResetFormData) => {
    if (data.code.length !== 6) {
      Toast.show({
        type: 'error',
        text1: t("passwordReset.invalidCodeTitle"),
        text2: t("passwordReset.invalidCodeMessage")
      });
      return;
    }

    recoveryMutate.mutate(
      { code: Number(data.code), email, newPass: data.newPassword },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: t("passwordReset.successTitle"),
            text2: t("passwordReset.successMessage")
          });
          navigation.navigate("Login");
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: "Error",
            text2: `${errorToast(error)}`
          });
          console.log('Error:', error)
        },
      }
    );
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
            rules={{
              required: t("passwordReset.requiredField"),
              validate: (value) =>
                value === newPassword || t("register.passwordMismatchMessage"),
            }}
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
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={passwordResetStyles.button}
          loading={recoveryMutate.isPending}
          disabled={recoveryMutate.isPending}
        >
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