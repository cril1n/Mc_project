import React, { useEffect, useState} from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import ViewModel from './viewModel/ViewModel';
import Root from './components/Root';
import LoadingScreen from './components/LoadingScreen';
import { styles } from './styles';

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
      <LoadingScreen textToShow="Initializing..." />
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
        <Image source={require('./assets/icons/location.png')} style={styles.locationLogo} />
        <Text style={styles.locationInfoText}>
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


