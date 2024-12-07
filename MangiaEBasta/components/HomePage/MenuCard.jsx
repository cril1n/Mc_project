import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles";

export default function MenuCard({ menu, navigation }) {
  const base64WithPrefix = menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Menu Details', { menu, navigation })}
    >
      <View style={styles.card}>
        <Image source={{ uri: base64WithPrefix }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{menu.name}</Text>
          <Text style={styles.cardDescription}>{menu.shortDescription}</Text>
          <Text style={styles.cardPrice}>
            Price: <Text style={styles.highlightedText}>{menu.price} €</Text> - Delivery time: <Text style={styles.highlightedText}>{menu.deliveryTime}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

