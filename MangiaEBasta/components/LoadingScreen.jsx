import { View, Text, ActivityIndicator, Image } from 'react-native';
import { styles } from '../styles';

export default function LoadingScreen(textToShow) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
          <ActivityIndicator style={{marginTop: 20}} size="large" color="#FF9F43" />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{textToShow.textToShow}</Text>
        </View>
      )
}