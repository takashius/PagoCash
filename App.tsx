import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from "expo-status-bar";
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import i18n from './src/i18n';
import Toast from 'react-native-toast-message';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <I18nextProvider i18n={i18n}>
          <UserProvider>
            <StatusBar translucent={true} backgroundColor="transparent" style="auto" />
            <AppNavigator />
            <Toast />
          </UserProvider>
        </I18nextProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
