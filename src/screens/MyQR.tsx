import { View, StyleSheet } from 'react-native'
import React from 'react'
import QRCode from '../components/QRCode';

const MyQR = () => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode accountId="PC-123456" name="María González" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  qrContainer: {
    padding: 20,
  },
});

export default MyQR