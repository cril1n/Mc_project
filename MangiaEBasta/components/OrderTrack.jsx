import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ViewModel from '../viewModel/ViewModel';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../model/UserContext';

export default function OrderTrack() {

    const { user } = useUser();
    const [order, setOrder] = useState(null);

    async function setLastScreen(screen) {
        try {
            await ViewModel.setLastScreen(screen);
        } catch (error) {
            console.log(error);
        }
    }


    useFocusEffect(
        
        React.useCallback(() => {
            setLastScreen('OrderTrack')
            let isActive = true;

            const fetchOrder = async () => {
                if (user.lastOid == null) {
                    return;
                }
                try {
                    const orderInfo = await ViewModel.getLastOrderInfo(user.lastOid);
                    console.log("Last order info in Order track:", orderInfo);
                    if (isActive) {
                        if (!orderInfo || orderInfo.status === 'COMPLETED') {
                            setOrder(null);
                        } else if (orderInfo.status === 'ON_DELIVERY') {
                            setOrder(orderInfo);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            fetchOrder();

            // Cleanup per evitare aggiornamenti su componenti smontati
            return () => {
                isActive = false;
            };
        }, [user])
    );

    if (order == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Nessun ordine in corso</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Il tuo ordine è in consegna</Text>
            <Text>Stato: {order.status}</Text>
            <Text>Consegna prevista per: {order.expectedDeliveryTimestamp}</Text>
        </View>
    )


}