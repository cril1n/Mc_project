import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ViewModel from "../../viewModel/ViewModel";
import { useLocation } from "../../model/LocationContext";
import { useUser } from "../../model/UserContext";
import { styles } from "../../styles";
import BasicAlert from "../BasicAlert";

export default function OrderCheckOut({ route, navigation }) {
  const { menu } = route.params || {};
  const { user, setUser } = useUser();
  const { location } = useLocation();
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({});

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
  };

  useEffect(() => {
    setAddressPost();
  }, [location]);

  const sendOrder = async () => {
    console.log("User:", user);
    try {
      let validUserInfo = await ViewModel.checkUserInfoBeforeOrder(user);
      let validUserCard = await ViewModel.checkUserCardBeforeOrder(user);

      if (!validUserInfo) {
        setAlertProps({
          title: "Data profile missing",
          message: "To place an order, please complete your profile.",
          confirmText: "Go to profile",
          onConfirm: () => navigation.navigate('Profile')
        });
        setShowAlert(true);
        return;
      }

      if (!validUserCard) {
        setAlertProps({
          title: "Billing information wrong",
          message: "Please make sure you have entered your payment details.",
          confirmText: "Go to billing section",
          onConfirm: () => navigation.navigate('Profile', { screen: 'Payment Info' })
        });
        setShowAlert(true);
        return;
      }

      console.log("User before last order check:", user);
      if (user.lastOid != null) {
        let lastOrderInfo = await ViewModel.getLastOrderInfo(user.lastOid)
        if (lastOrderInfo.status == 'COMPLETED') {
          let orderInfo = await ViewModel.sendOrder(menu.mid, location.coords.latitude, location.coords.longitude, user, setUser);
          console.log(orderInfo);
          if (orderInfo) {
            await ViewModel.saveLastMenuOrdered(menu);
            setAlertProps({
              title: "Order Confirmed",
              message: "Your order has been successfully confirmed.",
              confirmText: "Follow your order",
              onConfirm: () => navigation.navigate('OrderTrack', { menu })
            });
            setShowAlert(true);
          }
          return;
        }

      } else if (user.lastOid == null) {
        let orderInfo = await ViewModel.sendOrder(menu.mid, location.coords.latitude, location.coords.longitude, user, setUser);
        console.log("Order info:", orderInfo);
        if (orderInfo) {
          await ViewModel.saveLastMenuOrdered(menu);
          setAlertProps({
            title: "Order Confirmed",
            message: "Your order has been successfully confirmed.",
            confirmText: "Follow your order",
            onConfirm: () => navigation.navigate('OrderTrack', { menu })
          });
          setShowAlert(true);
        }
        return;
      }

      setAlertProps({
        title: "Order still in progress",
        message: "You already have an order in progress. You cannot place another order until it is delivered.",
        confirmText: "Follow your order",
        onConfirm: () => navigation.navigate('OrderTrack')
      });
      setShowAlert(true);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.orderCheckOutcontainer}>
      <View style={styles.header}>
        <MaterialIcons name="shopping-cart" size={48} color="#FFB534" />
        <Text style={styles.title}>Order Check Out</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>Order:</Text>
        <Text style={styles.addressText}>
          {menu.name && <Text style={styles.addressText2}>Name: </Text>}
          {menu.name && <Text style={styles.addressText}>{menu.name}{"\n"}</Text>}
          {(menu.deliveryTime || menu.deliveryTime == 0) && <Text style={styles.addressText2}>Delivery time: </Text>}
          {(menu.deliveryTime || menu.deliveryTime == 0) && <Text style={styles.addressText}>{menu.deliveryTime}{" min \n"}</Text>}
          {menu.price && <Text style={styles.addressText2}>Price: </Text>}
          {menu.price && <Text style={styles.addressText}>{menu.price + " €"}{"\n"}</Text>}
        </Text>
        {(address.street || address.city || address.region) && (
          <Text style={styles.label}>Address:</Text>
        )}
        <Text style={styles.addressText}>
          {address.region && <Text style={styles.addressText2}>Region: </Text>}
          {address.region && <Text style={styles.addressText}>{address.region}{"\n"}</Text>}
          {address.city && <Text style={styles.addressText2}>City: </Text>}
          {address.city && <Text style={styles.addressText}>{address.city}{"\n"}</Text>}
          {address.street && <Text style={styles.addressText2}>Street: </Text>}
          {address.street && <Text style={styles.addressText}>{address.street}{"\n"}</Text>}
          {address.streetNumber && <Text style={styles.addressText2}>n°: </Text>}
          {address.streetNumber && <Text style={styles.addressText}>{address.streetNumber}{"\n"}</Text>}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Are you ready to confirm your order? Make sure your data are correct!
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => sendOrder()}
        >
          <MaterialIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.confirmButtonText}>CONFIRM ORDER</Text>
        </TouchableOpacity>
      </View>
      {showAlert && (
        <BasicAlert
          title={alertProps.title}
          message={alertProps.message}
          confirmText={alertProps.confirmText}
          onConfirm={alertProps.onConfirm}
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  );
}
