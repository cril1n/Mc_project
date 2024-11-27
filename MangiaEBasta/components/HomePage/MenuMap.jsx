import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';

import MenuMarker from './MenuMarker';
import MapView from 'react-native-maps';
import { useLocation } from '../../model/LocationContext';

export default function MenuMap({ navigation, route }) {

    const { location, menuList } = route.params;
    const [region, setRegion] = useState(null);

    useEffect(() => {
        if (location) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      }, [location]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                loadingEnabled={true}
                region={region}
            >
                {menuList.map((menu) => (<MenuMarker key={menu.mid} menu={menu} />))}

            </MapView>
        </View>
    );
}

