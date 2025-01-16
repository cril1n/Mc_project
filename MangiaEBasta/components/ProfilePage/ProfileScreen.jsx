import React, { useState } from "react";
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
import BasicAlert from "../BasicAlert";
import { set } from "react-hook-form";



export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { refresh, triggerRefresh } = useRefresh();
  const [showAlert, setShowAlert] = useState(false)
  const menuItems = [
    {
      icon: "person-outline",
      label: "Personal Info",
      component: MaterialIcons,
      screen: "Profile Info",
    },
    {
      icon: "credit-card",
      label: "Payment Info",
      component: Feather,
      screen: "Payment Info",
    },
    {
      icon: "shopping-bag",
      label: "Last Order",
      component: Feather,
      screen: "Last Order Info",
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
    setShowAlert(false);
    await ViewModel.deleteAccount(refresh, triggerRefresh);
  }

  const openDeleteAlert = () => {
    setShowAlert(true);
  }

  const resetAlert = () => {
    setShowAlert(false);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {showAlert && (
        <BasicAlert
          title="Delete Account"
          message="Are you sure you want to delete your account?"
          confirmText="Delete"
          onConfirm={deleteAccount}
          onClose={resetAlert}
        />
      )}

      <View style={styles.profileHeader}>
        <Image source={require("../../assets/icons/logo.png")} style={styles.logo} />
        <Text style={styles.profileHeaderName}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.profileMenuContainer}>{menuItems.map(renderMenuItem)}</View>

      <TouchableOpacity style={styles.logoutButton} onPress={openDeleteAlert}>
        <Feather name="log-out" size={24} color="#FF6B6B" style={{ marginLeft: 8 }} />
        <Text style={styles.logoutText}> DELETE ACCOUNT</Text>
        <MaterialIcons name="chevron-right" size={24} color="#FF6B6B" style={{ marginRight: 8 }} />
      </TouchableOpacity>


    </SafeAreaView>
  );
}
