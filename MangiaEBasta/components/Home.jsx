import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MenuList from './MenuList';
import MenuMap from './MenuMap';
import MenuDetails from './MenuDetails';
import ProfileInfo from './ProfileInfo';

const Stack = createStackNavigator();
const MenuTab = createMaterialTopTabNavigator();


function MenuTabScreen() {
  return (
    <MenuTab.Navigator>
      <MenuTab.Screen name="Menu list" component={MenuList} />
      <MenuTab.Screen name="Menu map" component={MenuMap} />
    </MenuTab.Navigator>
  )
}


export default function Home() {

  return ( 
    <Stack.Navigator>
      <Stack.Screen name="Restaurants " component={MenuTabScreen} />
      <Stack.Screen name="Menu Details" component={MenuDetails} />
    </Stack.Navigator>
  );
}