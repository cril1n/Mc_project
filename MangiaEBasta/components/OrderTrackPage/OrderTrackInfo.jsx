
export default function OrderTrackInfo() {
    <View style={styles.trackingInfoContainer}>
        <Text>Il tuo ordine è in consegna</Text>
        <Text>Stato: {order.status}</Text>
        <Text>Consegna prevista per: {order.expectedDeliveryTimestamp}</Text>
    </View>
}