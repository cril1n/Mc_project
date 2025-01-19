import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useUser } from "../../model/UserContext";
import { styles } from "../../styles";
import ViewModel from "../../viewModel/ViewModel";
export default function Form({ checkProfile, navigation }) {
  const { user, setUser } = useUser();
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
      <Text style={[styles.formTitle, { color: "#333", textAlign: "center" }]}>
      First Registration
      </Text>
      <Text
        style={[styles.formSubtitle, { marginBottom: 20, textAlign: "center" }]}
      >
        Fill in the following fields to get started
      </Text>
      <TextInput
        placeholder="First name"
        style={styles.formInput}
        placeholderTextColor="#aaa"
        value={user.firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last name"
        style={styles.formInput}
        placeholderTextColor="#aaa"
        value={user.lastName}
        onChangeText={setLastName}
      />
      <TouchableOpacity
        style={styles.formSubmitButton}
        onPress={() => onSubmit()}
      >
        <Text style={styles.formSubmitButtonText}>Submit</Text>
      </TouchableOpacity>
      {isRegistered && (
        <Text style={styles.formSuccessText}>
          Registration completed successfully!
        </Text>
      )}
    </View>
  );
}
