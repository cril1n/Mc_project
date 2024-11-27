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
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}
    >
      <Stack.Screen name="Profile " component={ProfileScreen} />
      <Stack.Screen name="Profile Info" component={ProfileInfo} />
      <Stack.Screen name="Last order Info" component={LastorderInfo} />
      <Stack.Screen name="Address Info" component={AddressInfo} />
      <Stack.Screen name="Payment Info" component={PaymentInfo} />
    </Stack.Navigator>
  );
}

