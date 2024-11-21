import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import ViewModel from './viewModel/ViewModel';
import Root from './components/Root';

export default function App() {

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {

    async function initApp() {
      try {
        await ViewModel.initApp();
       //await ViewModel.ResetApp();
        setInitialized(true);
      } catch (error) {
        console.log(error);
      }
    }
    initApp();
  }, []);

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading app...</Text>
      </View>
    )
  }

  return (
    <Root />
  )


}

