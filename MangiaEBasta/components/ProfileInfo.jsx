import { View, Text, Button } from 'react-native';
import ViewModel from '../viewModel/ViewModel';
import { useLocation } from '../model/LocationContext';

export default function ProfileInfo() {
    const { location, setLocation } = useLocation();

    const updateLocation = () => {
        // Simula l'aggiornamento della posizione
        const newLocation = {
            coords: {
                latitude: location.coords.latitude + 0.1,
                longitude: location.coords.longitude + 0.1,
            },
        };
        setLocation(newLocation);
    };
    /*
    ViewModel.getFirstUser().then((res) => {
        console.log(res);
    });*/

    return (
        <View>
            <Text>ProfileInfo</Text>
            <Button title="Update Location" onPress={updateLocation} />
        </View>
    );
}