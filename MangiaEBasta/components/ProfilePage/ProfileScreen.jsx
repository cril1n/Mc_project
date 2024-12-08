import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles";
import { useUser } from "../../model/UserContext";
import { useRefresh } from "../../model/RefreshContext";
import ViewModel from "../../viewModel/ViewModel";



export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { refresh, triggerRefresh } = useRefresh();
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
      style={styles.profileMenuItem}
      onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.profileMenuItemContent}>
        <IconComponent name={icon} size={24} color="#666" />
        <Text style={styles.profileMenuItemText}>{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  const deleteAccount = async () => {
    await ViewModel.deleteAccount(refresh, triggerRefresh);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >

      <View style={styles.profileHeader}>
        <Image source={require("../../assets/icons/logo.png")} style={styles.logo} />
        <Text style={styles.profileHeaderName}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.profileMenuContainer}>{menuItems.map(renderMenuItem)}</View>

      <TouchableOpacity style={styles.logoutButton} onPress={deleteAccount}>
        <Feather name="log-out" size={24} color="#FF6B6B" style={{marginLeft: 8}} />
        <Text style={styles.logoutText}> DELETE ACCOUNT</Text>
        <MaterialIcons name="chevron-right" size={24} color="#FF6B6B" style={{marginRight: 8}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
