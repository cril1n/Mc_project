import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../model/UserContext';
import ViewModel from '../../viewModel/ViewModel';
import { styles } from '../../styles';

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
// NON CAPISCO PERCHè SE ENTRO IN MODALITà EDIT MI SPARISCONO CERTI CAMPI A SCHERMO
  return (
    <SafeAreaView>
      
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <View style={styles.profileHeader}>
            <Text style={styles.profileHeaderName}>{user.firstName} {user.lastName}</Text>
          </View>

          <View style={styles.infoContent}>
            {/* CARD NUMBER */}
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>CARD NUMBER:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={cardNumber || ''}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  autoFocus
                />
              ) : (
                <Text style={styles.infoFieldText}>{cardNumber}</Text>
              )}
            </View>

            {/* EXPIRY MONTH */}
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>EXPIRY MONTH:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={cardExpireMonth || ''}
                  onChangeText={setCardExpireMonth}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoFieldText}>{cardExpireMonth}</Text>
              )}
            </View>

            {/* EXPIRY YEAR */}
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>EXPIRY YEAR:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={cardExpireYear || ''}
                  onChangeText={setCardExpireYear}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoFieldText}>{cardExpireYear}</Text>
              )}
            </View>

            {/* CVV */}
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>CVV:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={cardCVV || ''}
                  onChangeText={setCardCVV}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoFieldText}>{cardCVV}</Text>
              )}
            </View>

            {/* CARD FULL NAME */}
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoFieldLabel}>CARD FULL NAME:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={cardFullName || ''}
                  onChangeText={setCardFullName}
                />
              ) : (
                <Text style={styles.infoFieldText}>{cardFullName}</Text>
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
          </KeyboardAvoidingView>
        </ScrollView>
      
    </SafeAreaView>
  );
}


