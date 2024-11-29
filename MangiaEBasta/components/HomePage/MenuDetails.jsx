import { Button } from "@react-navigation/elements";
import { View, Text } from "react-native";

export default function MenuDetail({navigation}) {
    console.log(navigation)
    return (
        <View>
            <Text>MenuDetail</Text>
            <Button title="Go to order track" onPress={() => navigation.navigate('OrderTrack')} />
        </View>
    );
}