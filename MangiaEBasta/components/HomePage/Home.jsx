import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import ViewModel from '../../viewModel/ViewModel';
import MenuList from './MenuList';
import MenuMap from './MenuMap';
import MenuDetails from './MenuDetails';
import MenuCard from './MenuCard';
import OrderCheckOut from './OrderCheckOut';
import LoadingScreen from '../LoadingScreen';
import { useLocation } from '../../model/LocationContext';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';


const Stack = createStackNavigator();
const MenuTab = createMaterialTopTabNavigator();

// TO DO: Se aggiorno la posizione con il testo in PRofile, non mi passa la nuova posizione alle compomenti Mappa e lista

function MenuTabScreen({ location, menuList }) {
  return (
    <MenuTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: '#ffffff',
          elevation: 4,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarIndicatorStyle: {
          backgroundColor: '#f5ae3d',
          height: 3,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '700',
          marginTop: 20
        },
        tabBarPressColor: '#f5ae3d20',
        tabBarPressOpacity: 0.8,
      }}
    >
      <MenuTab.Screen name="Menu list" component={MenuList} initialParams={{ menuList }} />
      <MenuTab.Screen name="Menu map" component={MenuMap} initialParams={{ location, menuList }} />
    </MenuTab.Navigator>
  )
}


export default function Home() {
  const { location } = useLocation()
  const [menuList, setMenuList] = useState(null);

  async function setLastScreen(screen) {
    try {
      await ViewModel.setLastScreen(screen);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setLastScreen('Homepage')
    }));


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
      <LoadingScreen textToShow="Loading menus..." />
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerStyle: {
          elevation: 5,
          borderBottomWidth: 2, // Aggiunge la linea sotto la barra
          borderBottomColor: "#FFB534", // Colore della linea
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="Restaurants " >
        {props => <MenuTabScreen {...props} location={location} menuList={menuList} />}
      </Stack.Screen>
      <Stack.Screen name="Menu Card" component={MenuCard} />
      <Stack.Screen name="Menu Details" component={MenuDetails} />
      <Stack.Screen name="Order Check Out" component={OrderCheckOut} />
    </Stack.Navigator>
  );
}