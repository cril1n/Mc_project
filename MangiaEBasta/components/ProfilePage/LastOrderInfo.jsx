import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import ViewModel from '../../viewModel/ViewModel';
import { useFocusEffect } from '@react-navigation/native';

export default function LastOrderInfo() {

  const [lastOrder, setLastOrder] = useState(null)
  const [lastMenu, setLastMenu] = useState(null)
  const [base64WithPrefix, setImage] = useState(null);


  useFocusEffect(
    React.useCallback(() => {
      ViewModel.getLastOrderInfoFromAsyncStorage().then((lOrder) => { setLastOrder(lOrder); })
      ViewModel.getLastMenuOrdered().then((lMenu) => {
        console.log(lMenu.mid)
        setLastMenu(lMenu)
        setImage(lMenu.imageCode ? `data:image/jpeg;base64,${lMenu.imageCode}` : null);
      })
    }, [])
  );



  if (lastOrder != null && lastMenu != null && base64WithPrefix != null) {

    return (
      <ScrollView contentContainerStyle={styles.menuDetailcontainer}>
        {base64WithPrefix && (
          <Image
            source={{ uri: base64WithPrefix }}
            style={styles.menuDetailmenuImage}
          />
        )}
        <View style={styles.menuDetaildetailsContainer}>
          <Text style={styles.menuDetailmenuName}>{lastMenu.name}</Text>
          <Text style={styles.menuDetailmenuDescription}>{lastMenu.shortDescription}</Text>
          <View style={styles.menuDetailinfoRow}>
            <Text style={styles.menuDetaillabel}>Price:</Text>
            <Text style={styles.menuDetailvalue}>€{lastMenu.price.toFixed(2)}</Text>
          </View>
          <View style={styles.menuDetailinfoRow}>
            <Text style={styles.menuDetaillabel}>Delivery time:</Text>
            <Text style={styles.menuDetailvalue}>{lastMenu.deliveryTime} minutes</Text>
          </View>
          <View style={styles.menuDetailinfoRow}>
            <Text style={styles.menuDetaillabel}>Order time:</Text>
            <Text style={styles.menuDetailvalue}>{new Date(lastOrder.creationTimestamp).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>
    )
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/icons/logo.png')} style={styles.logo} />
        <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 20 }}>No orders completed yet</Text>
      </View>
    )
  }
}
