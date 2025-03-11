import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  resources: {
    es: {
      translation: {
        welcome: "Bienvenido a erCotizadorMobile",
      },
    },
    en: {
      translation: {
        welcome: "Welcome to erCotizadorMobile",
      },
    },
  },
});

export default i18n;
