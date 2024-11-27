import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { styles } from '../../styles';

export default function PaymentInfo() {


    return (
        <SafeAreaView style={styles.containerNavigator}>
    
      <View style={styles.content}>
        <Text>Payment information content goes here</Text>
      </View>
    </SafeAreaView>
    );
}