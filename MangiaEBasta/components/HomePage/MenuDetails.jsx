import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocation } from '../../model/LocationContext';
import ViewModel from '../../viewModel/ViewModel';
import { styles } from '../../styles';
import LoadingScreen from '../LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';

export default function MenuDetails({ route, navigation }) {
    const { menu } = route.params || {};
    const { location } = useLocation();
    const [base64WithPrefix, setImage] = useState(null);
    const [menuComplete, setMenu] = useState(null);

    useEffect(() => {
        // Funzione da eseguire quando la schermata viene sfocata (esci dalla schermata)
        const unsubscribe = navigation.addListener('blur', () => {
            ViewModel.saveLastMenuOpened(null);
        });
        // Cleanup dell'evento listener
        return unsubscribe;
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            ViewModel.saveLastMenuOpened(menu)
        })
    )

    useEffect(() => {

        setImage(menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null);
        ViewModel.getMenuComplete(location.coords.latitude, location.coords.longitude, menu.mid)
            .then((menuData) => { setMenu(menuData); })
            .catch((error) => { console.log(error); });
    }, []);



    if (menuComplete == null) {
        return (
            <LoadingScreen textToShow='Loading menu details...' />
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.menuDetailcontainer}>
            {base64WithPrefix && (
                <Image
                    source={{ uri: base64WithPrefix }}
                    style={styles.menuDetailmenuImage}
                />
            )}
            <View style={styles.menuDetaildetailsContainer}>
                <Text style={styles.menuDetailmenuName}>{menuComplete.name}</Text>
                <Text style={styles.menuDetailmenuDescription}>{menuComplete.longDescription}</Text>
                <View style={styles.menuDetailinfoRow}>
                    <Text style={styles.menuDetaillabel}>Price:</Text>
                    <Text style={styles.menuDetailvalue}>€{menuComplete.price.toFixed(2)}</Text>
                </View>
                <View style={styles.menuDetailinfoRow}>
                    <Text style={styles.menuDetaillabel}>Delivery time:</Text>
                    <Text style={styles.menuDetailvalue}>{menuComplete.deliveryTime} minutes</Text>
                </View>
                <TouchableOpacity
                    style={styles.menuDetailorderButton}
                    onPress={() => {
                        navigation.navigate('Order Check Out', { menu: menu });
                    }}
                >
                    <Text style={styles.menuDetailorderButtonText}>Order checkout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

