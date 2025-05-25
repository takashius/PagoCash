import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import generalStyles from "../../styles/global";
import passwordRecoveryStyles from "../../styles/passwordRecovery";

interface EmailFormData {
  email: string;
}

const PasswordRecovery: React.FC = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();
  const { control, handleSubmit } = useForm<EmailFormData>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: EmailFormData) => {
    // Simular envío de correo de recuperación
    setTimeout(() => {
      alert("Código de verificación enviado.");
      navigation.navigate("PasswordRecoveryTwo");
    }, 1500);
  };

  return (
    <View style={generalStyles.container}>
      {/* Encabezado */}
      <View style={generalStyles.header}>
        <Image source={require("../../../assets/logo.png")} style={passwordRecoveryStyles.logo} />
        <Text style={generalStyles.title}>{t("passwordRecovery.title")}</Text>
        <Text style={passwordRecoveryStyles.subtitle}>{t("passwordRecovery.subtitle")}</Text>
      </View>

      {/* Formulario con Scroll */}
      <ScrollView style={passwordRecoveryStyles.form} showsVerticalScrollIndicator={false}>
        {/* Correo */}
        <View style={passwordRecoveryStyles.formGroup}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                label={t("passwordRecovery.email")}
                placeholder={t("passwordRecovery.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                style={generalStyles.input}
              />
            )}
          />
        </View>

        {/* Botón de enviar */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={passwordRecoveryStyles.button}>
          {t("passwordRecovery.sendButton")}
        </Button>

        {/* Volver al login */}
        <Text style={passwordRecoveryStyles.backToLogin}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={passwordRecoveryStyles.backToLoginLink}>{t("passwordRecovery.backToLogin")}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default PasswordRecovery;