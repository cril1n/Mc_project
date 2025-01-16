import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../model/UserContext';
import ViewModel from '../../viewModel/ViewModel';
import { styles } from '../../styles';

export default function ProfileInfo() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');

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
    <SafeAreaView>
      <View style={styles.profileHeader}>
        <Text style={styles.profileHeaderName}>{user.firstName} {user.lastName}</Text>
      </View>

      <View style={styles.profileMenuContainer}>



        <View style={styles.infoContent}>
          <TouchableOpacity onPress={() => { isEditing ? handleSave() : setIsEditing(true) }}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>FIRST NAME:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoFocus
                />
              ) : (
                <Text style={styles.infoFieldText}>{firstName}</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { isEditing ? handleSave() : setIsEditing(true) }}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>LAST NAME:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={lastName}
                  onChangeText={setLastName}
                />
              ) : (
                <Text style={styles.infoFieldText}>{lastName}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
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
    </SafeAreaView>
  );
}


