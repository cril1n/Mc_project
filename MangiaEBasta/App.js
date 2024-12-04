import React, { useEffect, useState} from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import ViewModel from './viewModel/ViewModel';
import Root from './components/Root';

export default function App() {

  const [isFirstRun, setIsFirstRun] = useState(true);
  const [locationPermitted, setLocationPermitted] = useState(false);
  const [locRequestCounter, setLocRequestCounter] = useState(0);

  async function initApp() {
    try {
      console.log("initializing app");
      await ViewModel.initDB();
      let flag = await ViewModel.checkFirstRun();
      setIsFirstRun(flag);
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


  if (isFirstRun) {
    return (
      <ImageBackground source={require('./assets/landingPageBackground.png')} style={styles.background}>
        <TouchableOpacity style={styles.button} onPress={() => { setIsFirstRun(false) }}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </ImageBackground>
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
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 90,
    width: '80%',
    backgroundColor: 'orange',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  }
});

