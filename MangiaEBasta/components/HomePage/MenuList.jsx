import { ScrollView } from 'react-native';
import MenuCard from './MenuCard';
import { useEffect } from 'react';
import ViewModel from '../../viewModel/ViewModel';

export default function MenuList({ route, navigation }) {
    const { menuList } = route.params;

    useEffect(() => {
        ViewModel.checkLastMenuOpened().then((lastMenu) => {
            if (lastMenu) {
                navigation.navigate('Menu Details', { menu: lastMenu });
            }
        });
    }, []);

    return (
        <ScrollView>
            {menuList.map((menu) => (<MenuCard key={menu.mid} menu={menu} navigation={navigation} />))}
        </ScrollView>
    );
}