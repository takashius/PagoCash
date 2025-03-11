import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Dashboard from './src/components/Dashboard';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Acción al iniciar sesión
    setIsLoggedIn(true);
    Alert.alert("Sesión iniciada", "¡Bienvenido a Pago Cash!");
  };

  const handleSwitchToRegister = () => {
    // Acción para cambiar a la pantalla de registro
    Alert.alert("Registro", "Pantalla de registro no implementada.");
  };

  return (
    <Dashboard
      onLogout={handleLogin}
    />
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
