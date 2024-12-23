import React, { useRef, useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import ViewModel from '../../viewModel/ViewModel';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../model/UserContext';
import { styles } from '../../styles';
import OrderTrackMap from './OrderTrackMap';
import OrderTrackInfo from './OrderTrackInfo';


export default function OrderTrack() {
    const { user } = useUser();

   
    // mi tengo traccia dell'ultimo menu ordinato perche se l'utente prova a fare un ordine quando ne ha uno in corso la route mi torna null e spariscono i dati del menu in consegna
    const [lastMenuOrdered, setLastMenuOrdered] = useState(null);
    const [order, setOrder] = useState(null);
    
    const intervalIdRef = useRef(null); // Persistenza del valore dell'intervallo
    const onDelivery = useRef(false);

    async function setLastScreen(screen) {
        try {
            await ViewModel.setLastScreen(screen);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOrder = async () => {
        if (!user.lastOid) {
            console.log("No last order id");
            onUnload();
            return;
        }

        try {
            let orderInfo = await ViewModel.getLastOrderInfo(user.lastOid);
            if (!orderInfo) {
                console.log("Order info is null or undefined");
                setOrder(null);
                clearInterval(intervalIdRef.current);
                return;
            }
            console.log("Last order info in Order track:", orderInfo);
            if (!orderInfo || orderInfo.status === 'COMPLETED') {
                if (onDelivery.current) {
                    console.log("Order completed");
                    Alert.alert(
                        "Order completed!",
                        "Your order has been delivered!",
                        [{ text: "OK" }],
                        { cancelable: false }
                    );
                    onDelivery.current = false;
                    setLastMenuOrdered(null);
                }
                setOrder(null);
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            } else if (orderInfo.status === 'ON_DELIVERY') {
                console.log("Order on delivery");
                setOrder(orderInfo);
                onDelivery.current = true;
            }
        } catch (error) {
            console.log(error);
        }
    };

    onLoad = () => {
        console.log("Componente montato");
        if (intervalIdRef.current) {
            console.log("Interval already running, clearing existing one");
            clearInterval(intervalIdRef.current);
        }
        intervalIdRef.current = setInterval(() => {
            fetchOrder();
        }, 5000);
    };

    onUnload = () => {
        console.log("Componente smontato");
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log("OrderTrack focused");
            setLastScreen('OrderTrack');
            fetchOrder();
            ViewModel.getLastMenuOrdered().then((menu) => {
                setLastMenuOrdered(menu);
            });
            onLoad();
    
            return () => {
                console.log("OrderTrack unfocused");
                onUnload();
            };
        }, [])
    );

    if (order == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/logo.png')} style={styles.logo} />
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20}}>No orders in progress</Text>
            </View>
        )
    }

    return (
        <View style={styles.orderContainer}>

            <View style={styles.infoContainer}>
                { lastMenuOrdered && <OrderTrackInfo orderInfo={order} menuInfo={lastMenuOrdered} />}
            </View>
            <View style={styles.mapContainer}>
                <OrderTrackMap orderInfo={order} onDelivery={onDelivery} />
            </View>

        </View>
    )


}