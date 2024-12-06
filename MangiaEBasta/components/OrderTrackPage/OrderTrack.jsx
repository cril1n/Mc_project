import React, { useRef, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import ViewModel from '../../viewModel/ViewModel';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../model/UserContext';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import { styles } from '../../styles';
import { set } from 'lodash';

export default function OrderTrack() {
    const intervalIdRef = useRef(null); // Persistenza del valore dell'intervallo
    const [order, setOrder] = useState(null);
    const [onDelivery, setOnDelivery] = useState(false);
    const [startPosition, setStartPosition] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [currentOrderPosition, setCurrentOrderPosition] = useState(null);
    const [region, setRegion] = useState(null);
    const { user } = useUser();

    async function setLastScreen(screen) {
        try {
            await ViewModel.setLastScreen(screen);
        } catch (error) {
            console.log(error);
        }
    }

    async function setOnDeliveryAsync(value) {
        setOnDelivery(value);
        setTimeout(() => {
            console.log('Salvando on delivery');
        }, 3000);
    }

    const fetchOrder = async () => {
        if (!user.lastOid) {
            console.log("No last order id");
            return;
        }
        try {
            let orderInfo = await ViewModel.getLastOrderInfo(user.lastOid);
            console.log("Last order info in Order track:", orderInfo);
            if (!orderInfo || orderInfo.status === 'COMPLETED') {
                if (onDelivery) {
                    Alert.alert(
                        "Order completed!",
                        "Your order has been delivered!",
                        { cancelable: false }
                    );
                    await setOnDeliveryAsync(false);
                }
                setOrder(null);
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            } else if (orderInfo.status === 'ON_DELIVERY') {
                if (!onDelivery) {

                    setRegion({
                        latitude: (Number(orderInfo.currentPosition.lat) + Number(orderInfo.deliveryLocation.lat)) / 2,
                        longitude: (Number(orderInfo.currentPosition.lng) + Number(orderInfo.deliveryLocation.lng)) / 2,
                        latitudeDelta: Math.abs(Number(orderInfo.currentPosition.lat) - Number(orderInfo.deliveryLocation.lat)) * 1.3,
                        longitudeDelta: Math.abs(Number(orderInfo.currentPosition.lng) - Number(orderInfo.deliveryLocation.lng)) * 1.3,
                    });
                    console.log(onDelivery)
                }
                await setOnDeliveryAsync(true);
                console.log("On delivery?", onDelivery);
                setOrder(orderInfo);

                setStartPosition({
                    latitude: orderInfo.currentPosition.lat,
                    longitude: orderInfo.currentPosition.lng
                });
                setDeliveryLocation({
                    latitude: orderInfo.deliveryLocation.lat,
                    longitude: orderInfo.deliveryLocation.lng
                })
                setCurrentOrderPosition({
                    latitude: orderInfo.currentPosition.lat,
                    longitude: orderInfo.currentPosition.lng
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    onLoad = () => {
        console.log("Componente montato");
        intervalIdRef.current = setInterval(() => {
            fetchOrder();
        }, 5000);
    }

    onUnload = () => {
        console.log("Componente smontato");
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }

    useFocusEffect(
        React.useCallback(() => {
            setLastScreen('OrderTrack');
            fetchOrder();
            onLoad();
            return () => onUnload();
        }, [])
    );





    if (order == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Nessun ordine in corso</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.trackingInfoContainer}>
                <Text>Il tuo ordine è in consegna</Text>
                <Text>Stato: {order.status}</Text>
                <Text>Consegna prevista per: {order.expectedDeliveryTimestamp}</Text>
            </View>

            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                loadingEnabled={true}
                region={region}
            >
                <Marker
                    coordinate={currentOrderPosition}
                    title="Drone"
                    description="Ordine in arrivo"
                    pinColor="red"
                >
                    <Image
                        source={require('../../assets/icons/drone.png')}
                        style={{ width: 30, height: 30 }} // Specifica le dimensioni desiderate
                    />
                </Marker>
                <Marker
                    coordinate={deliveryLocation}
                    title="Punto di ritiro"
                    description="Via Celoria 18, 20133 Milano"
                    pinColor="red"
                />
                <Polyline
                    coordinates={[startPosition, deliveryLocation]}
                    strokeColor="#f5a433"
                    strokeWidth={3}
                />

            </MapView>

        </View>
    )


}