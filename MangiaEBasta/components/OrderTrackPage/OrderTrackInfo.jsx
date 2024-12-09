import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles';


export default function OrderTrackInfo({ orderInfo, menuInfo }) {


    if (orderInfo == null) {
        return (
            <View >
                <Text style={styles.title}>No orders available for delivery</Text>
            </View>
        )
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <View >
            <Text style={{fontSize: 23, fontWeight:'bold', color:'orange', marginBottom: 10}}>Your order is on delivery</Text>
            <Text style={{fontSize: 15}}>Delivery expected by: </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 6}}>{formatDate(orderInfo.expectedDeliveryTimestamp)}</Text>
            <Text style={{fontSize: 15}}>Menu:</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 6}}>{menuInfo.name}</Text>
            <Text style={{fontSize: 15}}>Price: </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{menuInfo.price + " €"} </Text>

        </View>
    )
} 