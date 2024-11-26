import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles';

export default function PaymentInfo() {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.containerNavigator}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Info</Text>
      </View>
      <View style={styles.content}>
        <Text>Payment information content goes here</Text>
      </View>
    </SafeAreaView>
    );
}