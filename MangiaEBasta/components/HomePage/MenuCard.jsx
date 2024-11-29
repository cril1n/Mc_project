
import { styles } from "../../styles";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function MenuCard({ menu, navigation }) {

    const base64WithPrefix = menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Menu Details', { menu })}>
            <View style={styles.card}>
                <Image source={{ uri: base64WithPrefix }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                    <Text style={styles.cardTitle}>{menu.name}</Text>
                    <Text style={styles.cardDescription}>{menu.shortDescription}</Text>
                    <Text style={styles.cardPrice}>Price: {menu.price}, Delivery time: {menu.deliveryTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}