import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import ProfileInfo from './ProfileInfo';
import LastOrderInfo from './LastOrderInfo';
import PaymentInfo from './PaymentInfo';
import Form from './Form';
import CommunicationController from '../../manager/CommunicationManager';
import ViewModel from '../../viewModel/ViewModel';
import { View, Text } from 'react-native';
import { useUser } from '../../model/UserContext';
import _ from 'lodash';
import { useFocusEffect } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function Profile() {

  const { user, setUser } = useUser();

  async function setLastScreen(screen) {
    try {
      await ViewModel.setLastScreen(screen);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setLastScreen('Profile')
    }));

  const checkProfile = async () => {
    const savedUser = await ViewModel.getUser();
    console.log("Checking if profile has been modified");
    if (!_.isEqual(user, savedUser)) {
      console.log("Users diversi");
      await CommunicationController.modifyUser(user);
      await ViewModel.updateUser(user);
    }
  }

  useEffect(() => {
    checkProfile();
  
  }, [user]);

  if (!user) {
    return (
      <View><Text>Loading data.. </Text></View>
    )
  }

  if (user.firstName == null || user.lastName == null) {
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
      <Stack.Screen name="Profile " component={ProfileScreen} />
      <Stack.Screen name="Profile Info" component={ProfileInfo} />
      <Stack.Screen name="Last Order Info" component={LastOrderInfo} />
      <Stack.Screen name="Payment Info" component={PaymentInfo} />
    </Stack.Navigator>
  );
}

