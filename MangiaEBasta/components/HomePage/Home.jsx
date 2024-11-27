import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import ViewModel from '../../viewModel/ViewModel';
import { styles } from '../../styles';


import MenuList from './MenuList';
import MenuMap from './MenuMap';
import MenuDetails from './MenuDetails';
import { useLocation } from '../../model/LocationContext';

const Stack = createStackNavigator();
const MenuTab = createMaterialTopTabNavigator();

// TO DO: Se aggiorno la posizione con il testo in PRofile, non mi passa la nuova posizione alle compomenti Mappa e lista

function MenuTabScreen({location, menuList}) {
  return (
    <MenuTab.Navigator>
      <MenuTab.Screen name="Menu list" component={MenuList} initialParams={{ location, menuList }} />
      <MenuTab.Screen name="Menu map" component={MenuMap} initialParams={{ location, menuList }} />
    </MenuTab.Navigator>
  )
}


export default function Home() {
  const { location } = useLocation()
  const [menuList, setMenuList] = useState(null);

  useEffect(() => {
    ViewModel.getNearMenus(location.coords.latitude, location.coords.longitude)
      .then((menus) => {
        setMenuList(menus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  if (!menuList) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading menus...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="Restaurants ">
        {props => <MenuTabScreen {...props} location={location} menuList={menuList} />}
      </Stack.Screen>
      <Stack.Screen name="Menu Details" component={MenuDetails} />
    </Stack.Navigator>
  );
}