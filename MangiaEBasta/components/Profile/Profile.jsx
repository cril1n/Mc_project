import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import ProfileInfo from './ProfileInfo';
import LastorderInfo from './LastorderInfo';
import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo'; 

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="LastorderInfo" component={LastorderInfo} />
      <Stack.Screen name="AddressInfo" component={AddressInfo} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
    </Stack.Navigator>
  );
}

