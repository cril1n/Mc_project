import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';


export default function MenuMarker({ menu }) {

    const base64WithPrefix = menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null;

    return (
        <Marker
            coordinate={{ latitude: menu.location.lat, longitude: menu.location.lng }}
            title={menu.name}
            description={menu.shortDescription}
        >
            <Image
                source={{ uri: base64WithPrefix }}
                style={{ width: 30, height: 30, borderRadius:20 , borderColor: 'black', borderWidth:2}} // Specifica le dimensioni desiderate
            />
        </Marker>
    );
}