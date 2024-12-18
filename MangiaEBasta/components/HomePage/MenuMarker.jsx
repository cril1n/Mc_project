import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';


export default function MenuMarker({ menu, navigation }) {

    const base64WithPrefix = menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null;

    return (
        <Marker
            coordinate={{ latitude: menu.location.lat, longitude: menu.location.lng }}
            title={menu.name}
            description={menu.shortDescription}
            onCalloutPress={() => navigation.navigate('Menu Details', { menu: menu })}
        >
            <Image
                source={{ uri: base64WithPrefix }}
                style={{ width: 38, height: 38, borderRadius:20 , borderColor: 'black', borderWidth:2}} // Specifica le dimensioni desiderate
            />
        </Marker>
    );
}