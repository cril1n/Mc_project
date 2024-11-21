import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfileInfo from './ProfileInfo';
import LOrderInfo from './LOrderInfo';

const Tab = createMaterialTopTabNavigator();


export default function Profile({navigation}) {


    return (
        <Tab.Navigator>
          <Tab.Screen name="Profile info" component={ProfileInfo} />
          <Tab.Screen name="Last order info" component={LOrderInfo} />
        </Tab.Navigator>
      );
}