import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../model/UserContext";
import { styles } from "../../styles";
import ViewModel from "../../viewModel/ViewModel";
export default function Form({ checkProfile, navigation }) {
  const { user, setUser } = useUser();
  const { handleSubmit, setValue } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  const onSubmit = async () => {
    try {
      const savedSid = await ViewModel.getSid();
      const savedUid = await ViewModel.getUid();
      const updatedUser = {
        ...user,
        firstName: firstName,
        lastName: lastName,
        sid: savedSid,
        uid: savedUid,
      };

      const error =
        (firstName &&
          ViewModel.validateProfileInfoField("firstName", firstName)) ||
        (lastName && ViewModel.validateProfileInfoField("lastName", lastName));
        console.log("ERRORE: ", firstName + " " + lastName);
      if (error) {
        console.log(error);
        Alert.alert("Error", error);
        return;
      }
      setIsRegistered(true);
      // Attendere 2 secondi prima di aggiornare l'utente
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(updatedUser);
    } catch (error) {
      console.log("ERRORE: ", error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: "#F8F9FA" }]}>
      <Text style={[styles.title, { color: "#333", textAlign: "center" }]}>
        Prima Registrazione
      </Text>
      <Text
        style={[styles.subtitle, { marginBottom: 20, textAlign: "center" }]}
      >
        Compila i seguenti campi per iniziare
      </Text>
      <TextInput
        placeholder="First name"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={user.firstName}
        onChangeText={(text) => onChangeField(text, "firstName")}
      />
      <TextInput
        placeholder="Last name"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={user.lastName}
        onChangeText={(text) => onChangeField(text, "lastName")}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onSubmit()}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {isRegistered && (
        <Text style={styles.successText}>
          Registrazione completata con successo!
        </Text>
      )}
    </View>
  );
}
