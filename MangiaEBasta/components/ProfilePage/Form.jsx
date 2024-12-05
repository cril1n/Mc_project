import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../model/UserContext';
import { styles } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Form({ checkProfile, navigation }) {
  const { user, setUser } = useUser();
  const { handleSubmit, setValue } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = async (formData) => {
    try {
        const savedSid = await AsyncStorage.getItem('sid');
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        sid: savedSid,
      };
      setIsRegistered(true);
      // Attendere 2 secondi prima di aggiornare l'utente
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setUser(updatedUser);
      
    } catch (error) {
      console.log("ERRORE: ", error);
    }
  };

  const onChangeField = (text, name) => {
    setValue(name, text);
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <Text style={[styles.title, { color: '#333', textAlign: 'center' }]}>
        Prima Registrazione
      </Text>
      <Text style={[styles.subtitle, { marginBottom: 20, textAlign: 'center' }]}>
        Compila i seguenti campi per iniziare
      </Text>
      <TextInput
        placeholder="First name"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={user.firstName}
        onChangeText={(text) => onChangeField(text, 'firstName')}
      />
      <TextInput
        placeholder="Last name"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={user.lastName}
        onChangeText={(text) => onChangeField(text, 'lastName')}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {isRegistered && (
        <Text style={styles.successText}>Registrazione completata con successo!</Text>
      )}
    </View>
  );
}
