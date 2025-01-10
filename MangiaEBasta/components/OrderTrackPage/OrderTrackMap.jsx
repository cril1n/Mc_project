import { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { styles } from '../../styles'



export default function OrderTrackMap({ orderInfo, onDelivery }) {

    const [startPosition, setStartPosition] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [currentOrderPosition, setCurrentOrderPosition] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        setRegion({
            latitude: (Number(orderInfo.currentPosition.lat) + Number(orderInfo.deliveryLocation.lat)) / 2,
            longitude: (Number(orderInfo.currentPosition.lng) + Number(orderInfo.deliveryLocation.lng)) / 2,
            latitudeDelta: Math.abs(Number(orderInfo.currentPosition.lat) - Number(orderInfo.deliveryLocation.lat)) * 1.3,
            longitudeDelta: Math.abs(Number(orderInfo.currentPosition.lng) - Number(orderInfo.deliveryLocation.lng)) * 1.3,
        });
        console.log("ho settato la regione");
    }, [onDelivery.current])



    useEffect(() => {
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
    }, [orderInfo])

    if(region){
        return (
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
                    anchor={{ x: 0.4, y: 0.45 }}
                >
                    <Image
                        source={require('../../assets/icons/drone.png')}
                        style={{ width: 30, height: 30 }} // Specifica le dimensioni desiderate
                    />
                </Marker>
                <Marker
                    coordinate={deliveryLocation}
                    title="Punto di ritiro"
                    pinColor="red"
                    anchor={{ x: 0.3, y: 0.9 }}
                >
                    <Image
                        source={require('../../assets/icons/destination.png')}
                        style={{ width: 40, height: 40 }} // Specifica le dimensioni desiderate
                    />
                </Marker>
                <Polyline
                    coordinates={[startPosition, deliveryLocation]}
                    strokeColor="#f5a433"
                    strokeWidth={3}
                />
            </MapView>
        )
    }
}