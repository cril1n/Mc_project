import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CommunicationController from '../../manager/CommunicationManager';
import ViewModel from '../../viewModel/ViewModel';
import { useUser } from '../../model/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Form({checkProfile, navigation}) {

    const {user, setUser} = useUser();

    const [profilo, setProfilo] = useState(user);
    const { handleSubmit, setValue } = useForm(); // Inizializzo un oggetto form e scelgo le funzioni che mi servono
    const [isRegistered, setIsRegistered] = useState(false);
    const [refresh, setRefresh] = useState(false);

   

    const onSubmit = async (formData) => {
        try{
            const savedSid = await AsyncStorage.getItem("sid");
            const updatedUser = {
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                sid: savedSid,
            };
            await CommunicationController.modifyUser(updatedUser);
            await ViewModel.updateUser(updatedUser);
            setUser(updatedUser);
        }catch(error){
            console.log("ERRORE: ", error);
        }

        
        /*try {
            //console.log("formdata", formData);
            //console.log("User in onSubmit", user);
            
        } catch (error) {
            console.log(error)
        }
        setIsRegistered(true);
        setRefresh(!refresh);
        () => {checkProfile()};*/
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 10,
        marginBottom: 20, // Increased margin between boxes
        width: '40%', // Shortened width
    },
    submitButton: {
        padding: 50, // Increased button size
    },
    successText: {
        color: 'green',
        marginTop: 10,
        fontSize: 17,
    },
});