import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import ViewModel from './viewModel/ViewModel';
import Root from './components/Root';

export default function App() {

  const [initialized, setInitialized] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(null);
  const [locationPermitted, setLocationPermitted] = useState(false);
  const [locRequestCounter, setLocRequestCounter] = useState(0);

  async function initApp() {
    try {
      console.log("initializing app");
      await ViewModel.initDB();
      let flag = await ViewModel.checkFirstRun();
      setIsFirstRun(flag);
      setInitialized(true);
      if (!flag) {
        console.log("initializing position");
        await setLocationPermitted(await ViewModel.initPosition())
        setLocRequestCounter(locRequestCounter + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    initApp();
  }, []);

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Initializing...</Text>
      </View>
    )
  }

  if (isFirstRun) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LANDING PAGE</Text>
        <Button title="start" onPress={() => { setIsFirstRun(false) }} />
      </View>
    )
  }

  if (!isFirstRun) {
    if (!locationPermitted) {
      if (locRequestCounter > 1) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Location permission refused. Please set the location permission from the device settings. Or re install the app.</Text>
          </View>
        )
      }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Please accept location permission</Text>
          <Button title="Location permission" onPress={
            async () => {
              setLocationPermitted(await ViewModel.initPosition())
              setLocRequestCounter(locRequestCounter + 1)
            }}
          />
        </View>
      )
    }

    if (locationPermitted) {
      return (
        <Root />
      )
    }
  }


}

