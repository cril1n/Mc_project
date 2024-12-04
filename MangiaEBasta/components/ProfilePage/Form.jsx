import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CommunicationController from '../../manager/CommunicationManager';
import ViewModel from '../../viewModel/ViewModel';
import { useUser } from '../../model/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles';
export default function Form({checkProfile, navigation}) {

    const {user, setUser} = useUser();

    const [profilo, setProfilo] = useState(user);
    const { handleSubmit, setValue } = useForm(); // Inizializzo un oggetto form e scelgo le funzioni che mi servono
    const [isRegistered, setIsRegistered] = useState(false);
    const [refresh, setRefresh] = useState(false);

   

    const onSubmit = async (formData) => {
        try{
            const savedSid = await ViewModel.getSid();
            const updatedUser = {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                sid: savedSid,
            };
            setUser(updatedUser);
        }catch(error){
            console.log("ERRORE: ", error);
        }
    }

    const onChangeField = (text, name) => {
        setValue(name, text);
        setProfilo((prevUser) => ({
            ...prevUser, // I 3 puntini creano una copia di prevUser
            [name]: text,
        }));
    }


    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.title}>Prima Registrazione</Text>
            <Text>Perfavore compila i seguenti campi:

            </Text>
            <TextInput
                placeholder='First name'
                style={styles.input}
                value={user.firstName}
                onChangeText={(text) => onChangeField(text, 'firstName')}
            />
            <TextInput
                placeholder='Last name'
                style={styles.input}
                value={user.lastName}
                onChangeText={(text) => onChangeField(text, 'lastName')}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} style={styles.submitButton} />
            {isRegistered && <Text style={styles.successText}>Registration successful!</Text>}

        </View>
    )


}

