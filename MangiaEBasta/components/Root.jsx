import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ViewModel from '../viewModel/ViewModel';
import Home from './HomePage/Home';
import OrderTrack from './OrderTrack';
import Profile from './ProfilePage/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationProvider } from '../model/LocationContext'; // Importa il contesto

const Tab = createBottomTabNavigator();



export default function Root() {
    const [initialLocation, setLocation] = useState(null);

    async function getInitialPosition() {
        try {
            setLocation(await ViewModel.getCurrentPosition());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInitialPosition();
    }, []);

    if (!initialLocation) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading position...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LocationProvider initialLocation={initialLocation}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName='Homepage'>
                        <Tab.Screen name='Homepage' component={Home}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/restaurant.png')} style={styles.icon} />
                                ),
                                headerShown: false,
                                title: 'Homepage',
                            }} />
                        <Tab.Screen name='OrderTrack' component={OrderTrack}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/order.png')} style={styles.icon} />
                                ),
                                title: 'Order Track',
                                headerTitleAlign: "center",
                                headerTintColor: '#000',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }} />
                        <Tab.Screen name='Profile' component={Profile}
                            options={{
                                tabBarIcon: () => (
                                    <Image source={require('../assets/icons/account.png')} style={styles.icon} />
                                ),
                                title: "Profile",
                                headerTitleAlign: "center",
                                headerShown: false,
                            }} />
                    </Tab.Navigator>
                </NavigationContainer >
            </LocationProvider>
        </SafeAreaView>
    )


}

