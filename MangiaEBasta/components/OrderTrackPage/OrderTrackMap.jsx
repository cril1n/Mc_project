
export default function OrderTrackMap() {
    <MapView
                style={styles.map}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                loadingEnabled={true}
                region={region}
            >
                <Marker
                    coordinate={currentOrderPosition}
                    title="Drone"
                    description="Ordine in arrivo"
                    pinColor="red"
                >
                    <Image
                        source={require('../../assets/icons/drone.png')}
                        style={{ width: 30, height: 30 }} // Specifica le dimensioni desiderate
                    />
                </Marker>
                <Marker
                    coordinate={deliveryLocation}
                    title="Punto di ritiro"
                    description="Via Celoria 18, 20133 Milano"
                    pinColor="red"
                />
                <Polyline
                    coordinates={[startPosition, deliveryLocation]}
                    strokeColor="#f5a433"
                    strokeWidth={3}
                />

            </MapView>
}