/*import { View, Image, Text, TouchableOpacity } from "react-native";
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

*/

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';



const { width } = Dimensions.get('window');

export default function MenuCard({ menu, navigation }) {
  const base64WithPrefix = menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null;

  return (
    <TouchableOpacity
      style={internStyles.cardContainer}
      onPress={() => navigation.navigate('Menu Details', {menu, navigation})}
    >
      <View style={internStyles.card}>
      <Image source={{ uri: base64WithPrefix }} style={internStyles.cardImage} />
        <View style={internStyles.cardDetails}>
          <Text style={internStyles.cardTitle} numberOfLines={1}>{menu.name}</Text>
          <Text style={internStyles.cardDescription} numberOfLines={2}>{menu.shortDescription}</Text>
          <View style={internStyles.cardFooter}>
            <Text style={internStyles.cardPrice}>
              €{menu.price.toFixed(2)}
            </Text>
            <Text style={internStyles.cardDeliveryTime}>
              Delivery time: {menu.deliveryTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const internStyles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  cardDeliveryTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});



