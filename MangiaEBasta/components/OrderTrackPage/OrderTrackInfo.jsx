import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles';


export default function OrderTrackInfo({ orderInfo }) {
    if (orderInfo == null) {
        return (
            <View >
                <Text style={styles.title}>Nessun ordine in consegna</Text>
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
            <Text style={styles.title}>Il tuo ordine è in consegna</Text>
            <Text>Delivery expected by: </Text>
            <Text>{formatDate(orderInfo.expectedDeliveryTimestamp)}</Text>
        </View>
    )
} 