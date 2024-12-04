import React, { useEffect, useState }from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import ProfileInfo from './ProfileInfo';
import LastorderInfo from './LastorderInfo';
import PaymentInfo from './PaymentInfo';
import Form from './Form';
import { View, Text } from 'react-native';
import { useUser } from '../../model/UserContext';

const Stack = createStackNavigator();

export default function Profile() {

  const {user, setUser} = useUser();

  const checkProfile = async () => {
    console.log('Profile page');
    console.log("User memorizzato nel contesto", user);
  }
  
  useEffect(() => {
    checkProfile();
    //console.log(profilo.firstName);
  }, [user]);

  if(!user){
    return (
      <View><Text>Loading data.. </Text></View>
    )
  }

  if(user.firstName == null || user.lastName == null){
    return (
      <Form />
    )
  }


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
      <Stack.Screen name="Profile " component={ProfileScreen}  />
      <Stack.Screen name="Profile Info" component={ProfileInfo} />
      <Stack.Screen name="Last order Info" component={LastorderInfo} />
      <Stack.Screen name="Payment Info" component={PaymentInfo} />
    </Stack.Navigator>
  );
}

