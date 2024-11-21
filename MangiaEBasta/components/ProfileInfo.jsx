import { View, Text } from 'react-native';
import ViewModel from '../viewModel/ViewModel';

export default function ProfileInfo() {
    ViewModel.getFirstUser().then((res) => {
        console.log(res);
    });

    return (
        <View>
            <Text>ProfileInfo</Text>
        </View>
    );
}