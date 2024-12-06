import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ViewModel from "../../viewModel/ViewModel";
import { useLocation } from "../../model/LocationContext";
import { useUser } from "../../model/UserContext";
import { set } from "lodash";

export default function OrderCheckOut({ route, navigation }) {
  const { mid } = route.params;
  const { user, setUser } = useUser();
  const { location } = useLocation();

  const [address, setAddress] = useState("");

  const setAddressPost = async () => {
    try {
      setAddress(
        await ViewModel.getAddress(
          location.coords.latitude,
          location.coords.longitude
        )
      );
    } catch (error) {
      console.log(error);
    }

    console.log("Address:", address);
  };

  useEffect(() => {
    setAddressPost();
  }, [location]);

  const sendOrder = async (mid) => {
    try {
      const validUser = await ViewModel.checkUserInfoBeforeOrder(user);

      if (!validUser) {
        Alert.alert(
          "Profilo Mancante",
          "Per effettuare un ordine, completa il tuo profilo e inserisci i dati di pagamento.",
          [
            {
              text: "OK",
              onPress: () => navigation.jumpTo("Profile"),
            },
          ],
          { cancelable: false }
        );
        return;
      }

      console.log("User before last order check:", user);

      if (user.lastOid) {
        const lastOrderInfo = await ViewModel.getLastOrderInfo(user.lastOid);

        if (lastOrderInfo.status === "COMPLETED") {
          const orderInfo = await ViewModel.sendOrder(
            mid,
            location.coords.latitude,
            location.coords.longitude,
            user,
            setUser
          );
          console.log(orderInfo);
          if (orderInfo) {
            Alert.alert(
              "Order Confirmed",
              "Your order has been successfully confirmed.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("OrderTrack"),
                },
              ]
            );
          }
          return;
        }
      } else {
        const orderInfo = await ViewModel.sendOrder(
          mid,
          location.coords.latitude,
          location.coords.longitude,
          user,
          setUser
        );
        console.log("Order info:", orderInfo);
        if (orderInfo) {
          Alert.alert(
            "Order Confirmed",
            "Your order has been successfully confirmed.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("OrderTrack"),
              },
            ]
          );
        }
        return;
      }

      Alert.alert(
        "Order in Progress",
        "You already have an order in progress. You cant make another one until it is delivered.",
        [
          {
            text: "OK",
          },
          {
            text: "Segui il tuo ordine",
            onPress: () => navigation.navigate("OrderTrack"),
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="shopping-cart" size={48} color="#FF9F43" />
        <Text style={styles.title}>Order Check Out</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.addressText}>
          {address.region && <Text style={styles.addressText2}>Region: </Text>}
          {address.region && `${address.region}\n`}

          {address.city && <Text style={styles.addressText2}>City: </Text>}
          {address.city && `${address.city}\n`}

          {address.street && <Text style={styles.addressText2}>Street: </Text>}
          {address.street && `${address.street}\n`}

          {address.streetNumber && (
            <Text style={styles.addressText2}>Street n°: </Text>
          )}
          {address.streetNumber}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Are you ready to confirm your order? Make sure your data are correct!
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => sendOrder(mid)}
        >
          <MaterialIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.confirmButtonText}>CONFIRM ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9F43",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 30,
    elevation:3,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addressContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 18,
    color: "#333",
  },
  addressText2: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});
