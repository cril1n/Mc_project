import React, { useRef, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import ViewModel from '../../viewModel/ViewModel';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../model/UserContext';
import { styles } from '../../styles';
import OrderTrackMap from './OrderTrackMap';
import OrderTrackInfo from './OrderTrackInfo';

export default function OrderTrack({route}) {
    const intervalIdRef = useRef(null); // Persistenza del valore dell'intervallo
    const [order, setOrder] = useState(null);
    const { user } = useUser();
    const onDelivery = useRef(false);
    const { menu } = route.params || {};
    ViewModel.saveMenuOrdered(menu);
    const menuOrdered = ViewModel.getMenuOrdered();
    console.log("Menu in OrderTrack:", menu);
    console.log("Menu ordered in OrderTrack:", menuOrdered);

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
            console.log("Last order info in Order track:", orderInfo);
            if (!orderInfo || orderInfo.status === 'COMPLETED') {
                console.log("ondelivery:", onDelivery)
                if (onDelivery.current) {
                    console.log("Order completed");
                    Alert.alert(
                        "Order completed!",
                        "Your order has been delivered!",
                        [
                            {
                                text: "OK"
                            }
                        ],
                        { cancelable: false }
                    );
                    onDelivery.current = false;
                }
                setOrder(null);
                ViewModel.removeMenuOrdered();
                onUnload();
            } else if (orderInfo.status === 'ON_DELIVERY') {
                setOrder(orderInfo);
                onDelivery.current = true;

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
                <Text>No orders in progress</Text>
            </View>
        )
    }

    return (
        <View style={styles.orderContainer}>

            <View style={styles.infoContainer}>
                {menu && <OrderTrackInfo orderInfo={order} menuInfo={menu}/> || menuOrdered && <OrderTrackInfo orderInfo={order} menuInfo={menuOrdered}/> }
            </View>
            <View style={styles.mapContainer}>
                <OrderTrackMap orderInfo={order} onDelivery={onDelivery} />
            </View>

        </View>
    )


}