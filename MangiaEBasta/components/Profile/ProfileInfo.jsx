import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles';

export default function ProfileInfo() {

  return (
    <SafeAreaView style={styles.containerNavigator}>
  
      <View style={styles.content}>
        <Text>Personal information content goes here</Text>
      </View>
    </SafeAreaView>
  );
} 

