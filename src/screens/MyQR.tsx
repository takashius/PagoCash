import { View } from 'react-native'
import React from 'react'
import QRCode from '../components/QRCode';
import generalStyles from '../styles/global';

const MyQR = () => {
  return (
    <View style={generalStyles.containerTop}>
      <View style={generalStyles.qrContainer}>
        <QRCode accountId="PC-123456" name="María González" />
      </View>
    </View>
  )
}

export default MyQR