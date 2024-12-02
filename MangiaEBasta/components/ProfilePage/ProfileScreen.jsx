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
import { useUser } from "../../model/UserContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const menuItems = [
    {
      icon: "person-outline",
      label: "Personal Info",
      component: MaterialIcons,
      screen: "Profile Info",
    },
    {
      icon: "shopping-bag",
      label: "Last Order",
      component: Feather,
      screen: "Last order Info",
    },
    {
      icon: "credit-card",
      label: "Payment Info",
      component: Feather,
      screen: "Payment Info",
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
  /*deleteAccount(){
    //QUI va il codice per eliminare l'account
    
  }*/

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
        <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>

      <TouchableOpacity style={styles.logoutButton}
       >
        <Feather name="log-out" size={24} color="#FF6B6B" />
        <Text style={styles.logoutText}> DELETE ACCOUNT</Text>
        <MaterialIcons name="chevron-right" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
