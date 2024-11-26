import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      icon: "person-outline",
      label: "Personal Info",
      component: MaterialIcons,
      screen: "ProfileInfo",
    },
    {
      icon: "map-pin",
      label: "Addresses",
      component: Feather,
      screen: "AddressInfo",
    },
    {
      icon: "shopping-bag",
      label: "Last Order",
      component: Feather,
      screen: "LastorderInfo",
    },
    {
      icon: "credit-card",
      label: "Payment Info",
      component: Feather,
      screen: "PaymentInfo",
    },
  ];

  const renderMenuItem = ({
    icon,
    label,
    component: IconComponent,
    screen,
  }) => (
    <TouchableOpacity
      key={label}
      style={styles.menuItem}
      onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.menuItemContent}>
        <IconComponent name={icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/profileIcon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{/*QUI va il codice per mettere nome e cognome dell'utente*/}Guerine Houssem</Text>
      </View>

      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>

      <TouchableOpacity style={styles.logoutButton}>
        <Feather name="log-out" size={24} color="#FF6B6B" />
        <Text style={styles.logoutText}> DELETE ACCOUNT</Text>
        <MaterialIcons name="chevron-right" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    margin: 16,
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF0F0',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
});*/
