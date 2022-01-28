import { NavigationContainer } from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import logo from './assets/favicon.png'

const NavigationBar = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/*Top Large Image */}
            <Image
                source={{ uri: { logo } }}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <Text>Hello</Text>
            </DrawerContentScrollView>
            <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
                www.mnb.softwares.com
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NavigationBar;