import { View, Text, Button } from 'react-native';

export default function MenuList({ navigation }) {

    return (
        <View>
            <Text>MenuList</Text>
            <Button title="Go to Menu Details" onPress={() => navigation.navigate('Menu Details')} />
        </View>
    );
}