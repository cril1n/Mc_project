import React from 'react';
import { Image } from 'react-native';
import { styles } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './HomePage/Home';
import OrderTrack from './OrderTrack';
import Profile from './Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationProvider } from '../model/LocationContext'; // Importa il contesto

const Tab = createBottomTabNavigator();

export default function Root({ location }) {
    //console.log('Root location:', location);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LocationProvider location={{ location }}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name='Restaurants' component={Home}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/restaurant.png')} style={styles.icon} />
                                ),
                                headerShown: false
                            }} />
                        <Tab.Screen name='OrderTrack' component={OrderTrack}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/order.png')} style={styles.icon} />
                                ),
                            }} />
                        <Tab.Screen name='Profile' component={Profile}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/account.png')} style={styles.icon} />
                                ),
                            }} />
                    </Tab.Navigator>
                </NavigationContainer >
            </LocationProvider>
        </SafeAreaView>
    )


}

