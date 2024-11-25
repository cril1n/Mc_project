import { View } from 'react-native';
import { styles } from '../../styles';

import MenuMarker from './MenuMarker';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MenuMap({ navigation, route }) {

    const { location, menuList } = route.params;
    const unimi = {
        latitude: 45.476046,
        longitude: 9.2318665,
    };
    const position = {
        latitude: 45.506046,
        longitude: 9.2018665,
    };


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                loadingEnabled={true}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {menuList.map((menu) => (<MenuMarker key={menu.mid} menu={menu} />))}

                <Marker
                    coordinate={position}
                    title="Posizione casuale"
                    description="casuale"
                    pinColor="blue"
                />
                <Marker
                    coordinate={unimi}
                    title="Dipartimento di Informatica"
                    description="Via Celoria 18, 20133 Milano"
                />
                <Polyline
                    coordinates={[position, unimi]}
                    strokeColor="green"
                    strokeWidth={2}
                />

            </MapView>
        </View>
    );
}

