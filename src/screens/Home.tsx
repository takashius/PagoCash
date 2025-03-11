import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para los íconos del tab

export default function HomeScreen() {
  // Ejemplo de datos de movimientos
  const movimientos = [
    { id: '1', tipo: 'Recibido de', nombre: 'Juan Pérez', monto: 'Bs. 500.00', fecha: '12/06/2023 14:30' },
    { id: '2', tipo: 'Pago a', nombre: 'Tienda ABC', monto: 'Bs. 120.50', fecha: '10/06/2023 09:15' },
  ];

  const renderMovimiento = ({ item }: any) => (
    <View style={styles.movimiento}>
      <Text style={styles.movimientoTipo}>{item.tipo} {item.nombre}</Text>
      <Text style={styles.movimientoMonto}>{item.monto}</Text>
      <Text style={styles.movimientoFecha}>{item.fecha}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Resumen del balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTexto}>Balance</Text>
        <Text style={styles.balanceMonto}>Bs. 1250.75</Text>
        <Text style={styles.cuentaTexto}>Cuenta: PC-123456</Text>
      </View>

      {/* Acciones rápidas */}
      <View style={styles.accionesContainer}>
        <TouchableOpacity style={styles.accion}>
          <Text style={styles.accionTexto}>Recargar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accion}>
          <Text style={styles.accionTexto}>Escanear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accion}>
          <Text style={styles.accionTexto}>Mi QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accion}>
          <Text style={styles.accionTexto}>Transferir</Text>
        </TouchableOpacity>
      </View>

      {/* Últimos movimientos */}
      <Text style={styles.seccionTitulo}>Últimos movimientos</Text>
      <FlatList
        data={movimientos}
        renderItem={renderMovimiento}
        keyExtractor={(item) => item.id}
      />

      {/* Tab de navegación */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#000" />
          <Text>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="list-outline" size={24} color="#000" />
          <Text>Movimientos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  balanceTexto: {
    fontSize: 16,
    color: '#555',
  },
  balanceMonto: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cuentaTexto: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  accionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  accion: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  accionTexto: {
    color: '#fff',
    fontSize: 14,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movimiento: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movimientoTipo: {
    fontSize: 14,
    color: '#555',
  },
  movimientoMonto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movimientoFecha: {
    fontSize: 12,
    color: '#888',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  tabItem: {
    alignItems: 'center',
  },
});
