import { View, Text, Button } from 'react-native';

export default function MenuMap({ navigation }) {
    return (
        <View>
            <Text>MenuMap</Text>
            <Button title="Go to Menu Details" onPress={() => navigation.navigate('Menu Details')} />
        </View>
    );
}