import React, { useEffect, useState } from "react";
import { Image, View, ActivityIndicator, Text } from "react-native";
import { styles } from "../styles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ViewModel from "../viewModel/ViewModel";
import Home from "./HomePage/Home";
import OrderTrack from "./OrderTrackPage/OrderTrack";
import Profile from "./ProfilePage/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "../model/LocationContext"; // Importa il contesto
import { UserProvider } from "../model/UserContext";
import { get } from "lodash";

const Tab = createBottomTabNavigator();

export default function Root() {
  const [initialLocation, setLocation] = useState(null);
  const [initialUser, setUser] = useState(null);
  const [lastScreen, setLastScreen] = useState("Homepage");

  async function getInitialPosition() {
    try {
      setLocation(await ViewModel.getCurrentPosition());
    } catch (error) {
      console.log(error);
    }
  }
  async function getInitialUser() {
    try {
      setUser(await ViewModel.getUser());
    } catch (error) {
      console.log(error);
    }
  }
  async function getLastScreen() {
    try {
      setLastScreen(await ViewModel.getLastScreen());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInitialPosition();
    getInitialUser();
    getLastScreen();
  }, []);

  if (!initialLocation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading position...</Text>
      </View>
    );
  }
  if (!initialUser) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LocationProvider initialLocation={initialLocation}>
        <UserProvider initialUser={initialUser}>
          <NavigationContainer>
            <Tab.Navigator initialRouteName= {lastScreen}>
              <Tab.Screen
                name="Homepage"
                component={Home}
                options={{
                  tabBarIcon: () => (
                    <Image
                      source={require("../assets/icons/restaurant.png")}
                      style={styles.icon}
                    />
                  ),
                  headerShown: false,
                  title: "Homepage",
                }}
              />
              <Tab.Screen
                name="OrderTrack"
                component={OrderTrack}
                options={{
                  tabBarIcon: () => (
                    <Image
                      source={require("../assets/icons/order.png")}
                      style={styles.icon}
                    />
                  ),
                  title: "Order Track",
                  headerTitleAlign: "center",
                  headerTintColor: "#000",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: () => (
                    <Image
                      source={require("../assets/icons/account.png")}
                      style={styles.icon}
                    />
                  ),
                  title: "Profile",
                  headerTitleAlign: "center",
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </UserProvider>
      </LocationProvider>
    </SafeAreaView>
  );
}
