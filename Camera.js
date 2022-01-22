import React from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import JsData from './ParcodeData.json'


function OpenCamera(props) {
    // const [openCamera, setopenCamera] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if(JsData[data]){
            alert(JsData[data].name + ' ' + JsData[data].price)
        }
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const closeCamera = () => {
        props.open()
    }
    return (
        <View style={styles.container1}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            />
            {scanned && <TouchableOpacity activeOpacity={0.5} onPress={() => setScanned(false)} style={styles.floatButton}>

                <AntDesign name='reload1' style={styles.button} />
            </TouchableOpacity>}
            <TouchableOpacity activeOpacity={0.5} onPress={closeCamera} style={styles.floatButton1}>

                <AntDesign name='close' style={styles.button} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        width: Dimensions.get('screen').width,
        backgroundColor: '#0A0A0A',
    },
    floatButton: {
        position: 'absolute',
        width: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 23,
        // borderColor:'rgba(255,255,255,0.5)',
        // borderWidth:0.2,
    },
    floatButton1: {
        position: 'absolute',
        width: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 23,
        // borderColor:'rgba(255,255,255,0.5)',
        // borderWidth:0.2,
    },
    button: {
        height: 60,
        width: 60,
        textAlign: 'center',
        lineHeight: 60,
        fontSize: 30,
        color: 'black',
    },
    camera: {
        height: Dimensions.get('screen').height / 1.219
    },

});

export default OpenCamera;
