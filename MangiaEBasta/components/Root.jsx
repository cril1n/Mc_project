import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { styles } from "../styles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewModel from "../viewModel/ViewModel";
import Home from "./HomePage/Home";
import OrderTrack from "./OrderTrackPage/OrderTrack";
import Profile from "./ProfilePage/Profile";
import LoadingScreen from "./LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "../model/LocationContext"; // Importa il contesto
import { UserProvider } from "../model/UserContext";
import { RefreshProvider } from "../model/RefreshContext";



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
      <LoadingScreen textToShow="Loading position..." />
    )
  }
  if (!initialUser) {
    return (
      <LoadingScreen textToShow="Loading user..." />
    )
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <LocationProvider initialLocation={initialLocation}>
        <UserProvider initialUser={initialUser}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={lastScreen}
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "white",
                  borderRadius: 20,
                  height: 85,
                  elevation: 5,
                  borderTopWidth: 0,
                  elevation: 0,
                },
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "grey",
                tabBarIconStyle: {
                  marginTop: 7,
                  width: 50,
                  height: 50,
                  paddingHorizontal: 50,
                  backgroundColor: "#FFB534",
                  borderRadius: 20,                  
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: "bold",
                },
                tabBarHideOnKeyboard: true,
                popToTopOnBlur: true,
              }}

            >
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
                  headerStyle: {
                    elevation: 5,
                    borderBottomWidth: 2, // Aggiunge la linea sotto la barra
                    borderBottomColor: "#FFB534", // Colore della linea
                  },
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
                  headerStyle: {
                    elevation: 5,
                    borderBottomWidth: 2, // Aggiunge la linea sotto la barra
                    borderBottomColor: "#FFB534", // Colore della linea
                  },
                  title: "Order Tracking",
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
