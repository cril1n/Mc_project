import { ScrollView } from 'react-native';
import MenuCard from './MenuCard';

export default function MenuList({ route, navigation }) {
    //console.log(navigation)
    const { menuList } = route.params;
    //console.log(menuList);
    return (
        <ScrollView>
            {menuList.map((menu) => (<MenuCard key={menu.mid} menu={menu} navigation={navigation} />))}
        </ScrollView>
    );
}