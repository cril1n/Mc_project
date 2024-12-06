import React, { useEffect, useState} from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
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
      <ImageBackground source={require('./assets/landingPageBackground.png')} style={styles.background}>
        <TouchableOpacity style={styles.button} onPress={() => { setIsFirstRun(false) }}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }

  if (!isFirstRun) {
    const handleLocationPermission = async () => {
      const permissionGranted = await ViewModel.initPosition();
      setLocationPermitted(permissionGranted);
      setLocRequestCounter((prev) => prev + 1);
    };
  
    const renderLocationDeniedMessage = () => (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>
          Location permission refused. Please enable location permission from the device settings or reinstall the app.
        </Text>
      </View>
    );
  
    const renderRequestLocationPermission = () => (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>
          To proceed, location permission is required. Please grant it by tapping the button below.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLocationPermission}>
          <Text style={styles.buttonText}>Enable Location</Text>
        </TouchableOpacity>
      </View>
    );
  
    if (!locationPermitted) {
      return locRequestCounter > 1 ? renderLocationDeniedMessage() : renderRequestLocationPermission();
    }
  
    return <Root />;
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
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  orangeButton: {
    marginTop: 20,
    width: '80%',
    backgroundColor: 'orange',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    elevetion: 3,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

