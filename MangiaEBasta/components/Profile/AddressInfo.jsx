import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles"; 

export default function AddressInfo() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("Via Celoria 18");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
          <Image
            source={require("../../assets/profileIcon.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{/*QUI va il codice per mettere nome e cognome dell'utente*/}Guerine Houssem</Text>
        </View>

      <View style={styles.content}>
        
        <View >
          <Text>ADDRESS:</Text>
          {isEditing ? (
            <TextInput
              style={styles.addressInput}
              value={address}
              onChangeText={setAddress}
              autoFocus
            />
          ) : (
            <Text style={styles.addressText}>{address}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <MaterialIcons name="location-on" size={24} color="#fff" />
          <Text style={styles.editButtonText}>
            {isEditing ? 'SAVE ADDRESS' : 'EDIT ADDRESS'}
          </Text>
          <MaterialIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

