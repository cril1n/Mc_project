import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

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
            Price: <Text style={styles.highlightedText}>{menu.price} €</Text> - Delivery: <Text style={styles.highlightedText}>{menu.deliveryTime}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 14,
    color: "#555",
  },
  highlightedText: {
    fontWeight: "bold",
    color: "orange",
  },
});
