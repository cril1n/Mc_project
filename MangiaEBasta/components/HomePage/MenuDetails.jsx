import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { useLocation } from '../../model/LocationContext';
import { useUser } from '../../model/UserContext';
import ViewModel from '../../viewModel/ViewModel';

export default function MenuDetails({ route, navigation }) {
    const { menu } = route.params;
    const { location } = useLocation();
    const { user, setUser } = useUser();
    const [base64WithPrefix, setImage] = useState(null);
    const [menuComplete, setMenu] = useState(null);

    useEffect(() => {
        setImage(menu.imageCode ? `data:image/jpeg;base64,${menu.imageCode}` : null);
        ViewModel.getMenuComplete(location.coords.latitude, location.coords.longitude, menu.mid)
            .then((menuData) => { setMenu(menuData); })
            .catch((error) => { console.log(error); });
    }, []);

    const sendOrder = async (mid) => {
        try {
            let validUser = await ViewModel.checkUserInfoBeforeOrder(user);

            if (!validUser) {
                Alert.alert(
                    "Profilo Mancante",
                    "Per effettuare un ordine, per favore completa il tuo profilo.\nControlla anche di aver inserito i dati di pagamento.",
                
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.jumpTo('Profile'),
                            style: "default"
                        }
                    ],
                    { cancelable: false }
                );
                return;
            }

            console.log("User before last order check:", user);
            if (user.lastOid != null) {
                let lastOrderInfo = await ViewModel.getLastOrderInfo(user.lastOid)
                if (lastOrderInfo.status == 'COMPLETED') {
                    let orderInfo = await ViewModel.sendOrder(mid, location.coords.latitude, location.coords.longitude, user, setUser);
                    console.log(orderInfo);
                    if (orderInfo) {
                        console.log(user);
                        Alert.alert(
                            "Ordine Confermato",
                            "Il tuo ordine è stato confermato con successo.",
                            [
                                {
                                    text: "OK",
                                    onPress: () => navigation.navigate('OrderTrack'),
                                    style: "default"
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                    return;
                }

            } else if (user.lastOid == null) {
                let orderInfo = await ViewModel.sendOrder(mid, location.coords.latitude, location.coords.longitude, user, setUser);
                console.log("Order info:", orderInfo);
                if (orderInfo) {
                    Alert.alert(
                        "Ordine Confermato",
                        "Il tuo ordine è stato confermato con successo.",
                        [
                            {
                                text: "OK",
                                onPress: () => navigation.navigate('OrderTrack'),
                                style: "default"
                            }
                        ],
                        { cancelable: false }
                    );
                }
                return;
            }

            Alert.alert(
                "Ordine in Corso",
                "Hai già un ordine in corso. Non puoi effettuarne un altro finché non viene consegnato.",
                [
                    {
                        text: "OK",
                        style: "default"
                    },
                    {
                        text: "Segui il tuo ordine",
                        onPress: () => navigation.navigate('OrderTrack'),
                        style: "default"
                    }
                ],
                { cancelable: false }
            )


        } catch (error) {
            console.log(error);
        }
    }

    if (menuComplete == null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading menu details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{menuComplete.name}</Text>
            {base64WithPrefix && (
                <Image
                    source={{ uri: base64WithPrefix }}
                    style={styles.image}
                />
            )}
            <Text style={styles.description}>{menuComplete.description}</Text>
            <Text style={styles.deliveryTime}>Delivery Time: {menuComplete.deliveryTime} minutes</Text>
            {/* Aggiungi ulteriori dettagli del menu qui */}
            <Button
                title="Place Order"
                onPress={() => sendOrder(menuComplete.mid)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    deliveryTime: {
        fontSize: 14,
        color: 'gray',
    },
});
