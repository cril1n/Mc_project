import React from 'react';
import { Image } from 'react-native';
import { styles } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import OrderTrack from './OrderTrack';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function Root() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Restaurants' component={Home} 
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../assets/icons/restaurant.png')} style={styles.icon} />
                    ),
                    headerShown: false
                }}/>
                <Tab.Screen name='OrderTrack' component={OrderTrack} 
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../assets/icons/order.png')} style={styles.icon} />
                    ),
                }}/>
                <Tab.Screen name='Profile' component={Profile} 
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../assets/icons/account.png')} style={styles.icon} />
                    ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer >
    )


}

