import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../model/UserContext';
import ViewModel from '../../viewModel/ViewModel';

export default function PaymentInfo() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [cardNumber, setCardNumber] = useState(user.cardNumber || '');
  const [cardExpireMonth, setCardExpireMonth] = useState(user.cardExpireMonth || '');
  const [cardExpireYear, setCardExpireYear] = useState(user.cardExpireYear || '');
  const [cardCVV, setCardCVV] = useState(user.cardCVV || '');
  const [cardFullName, setCardFullName] = useState(user.cardFullName || '');

  const handleSave = async () => {
    const savedSid = await ViewModel.getSid();
    const savedUid = await ViewModel.getUid();
    const updatedUser = {
      ...user,
      cardNumber,
      cardExpireMonth,
      cardExpireYear,
      cardCVV,
      cardFullName,
      sid: savedSid,
      uid: savedUid,
    };
    const error = (cardNumber && ViewModel.validateCardField('cardNumber', cardNumber)) ||
                  (cardExpireMonth && ViewModel.validateCardField('cardExpireMonth', cardExpireMonth)) ||
                  (cardExpireYear && ViewModel.validateCardField('cardExpireYear', cardExpireYear)) ||
                  (cardCVV && ViewModel.validateCardField('cardCVV', cardCVV)) ||
                  (cardFullName && ViewModel.validateCardField('cardFullName', cardFullName));

    if (error) {
      console.log(error);
      Alert.alert('Error', error);
      return;
    }

    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.profileSection}>
            <Image
              source={require("../../assets/profileIcon.png")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
          </View>

          <View style={styles.content}>
            {/* CARD NUMBER */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>CARD NUMBER:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={cardNumber || ''}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  autoFocus
                />
              ) : (
                <Text style={styles.fieldText}>{cardNumber}</Text>
              )}
            </View>

            {/* EXPIRY MONTH */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>EXPIRY MONTH:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={cardExpireMonth || ''}
                  onChangeText={setCardExpireMonth}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fieldText}>{cardExpireMonth}</Text>
              )}
            </View>

            {/* EXPIRY YEAR */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>EXPIRY YEAR:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={cardExpireYear || ''}
                  onChangeText={setCardExpireYear}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fieldText}>{cardExpireYear}</Text>
              )}
            </View>

            {/* CVV */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>CVV:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={cardCVV || ''}
                  onChangeText={setCardCVV}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fieldText}>{cardCVV}</Text>
              )}
            </View>

            {/* CARD FULL NAME */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>CARD FULL NAME:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={cardFullName || ''}
                  onChangeText={setCardFullName}
                />
              ) : (
                <Text style={styles.fieldText}>{cardFullName}</Text>
              )}
            </View>

            {/* Save/Edit Button */}
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderBottomColor: '#FF9F43', // Orange border color
    paddingVertical: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9F43', // Orange button
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
