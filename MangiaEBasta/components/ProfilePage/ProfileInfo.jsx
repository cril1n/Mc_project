import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../model/UserContext';
import ViewModel from '../../viewModel/ViewModel';

export default function ProfileInfo() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleSave = async () => {
      const savedSid = await ViewModel.getSid();;
      const savedUid = await ViewModel.getUid();
      const updatedUser = {
                  ...user,
                  firstName: firstName,
                  lastName: lastName,
                  sid: savedSid,
                  uid: savedUid,
              };

      const error = (firstName && ViewModel.validateProfileInfoField('firstName', firstName)) ||
              (lastName && ViewModel.validateProfileInfoField('lastName', lastName))
    if (error) {
    console.log(error);
    Alert.alert('Error', error);
    return;
    }
    setUser(updatedUser);
    setIsEditing(false);
    // Qui dovresti aggiungere la logica per salvare i dati sul server
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/profileIcon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>FIRST NAME:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              autoFocus
            />
          ) : (
            <Text style={styles.fieldText}>{firstName}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>LAST NAME:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          ) : (
            <Text style={styles.fieldText}>{lastName}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="#fff" />
          <Text style={styles.editButtonText}>
            {isEditing ? 'SAVE' : 'EDIT'}
          </Text>
          <MaterialIcons name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  fieldText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9F43', // Pulsante arancione
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

