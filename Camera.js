import React from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useState, useEffect } from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import JsData from './ParcodeData.json'
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx'
// import swal from 'sweetalert';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import Overlay from 'react-native-popup-dialog/dist/components/Overlay';
import { FancyAlert } from 'react-native-expo-fancy-alerts';


function OpenCamera(props) {
    // const [openCamera, setopenCamera] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const [popup, setpopup] = useState(false);
    const [BarData, setBarData] = useState(null);
    let DDP = FileSystem.documentDirectory + 'ParcodeData.json'

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // console.warn(data);
        FileSystem.readAsStringAsync(DDP, { encoding: FileSystem.EncodingType.UTF8 }).then(b64 => {
            // let wb = XLSX.read(b64, { type: "base64" })
            // const wsName = wb.SheetNames[0]
            // const ws = wb.Sheets[wsName]
            // const wsData = XLSX.utils.sheet_to_json(ws, { header: 1 })
            // let data2 = `${data}`
            // console.warn(2222,data2);
            // console.warn(typeof(JSON.parse(b64)));
            let dect = JSON.parse(b64)
            // console.warn(dect)
            // console.warn(dect[data]);
            if (dect[data]) {
                setBarData(dect[data])
                setpopup(true)
            } else {
                setpopup(true)

            }
            // for(const [key,value] of Object.entries(b64)){
            //     console.warn(key);
            //     if(key == data){
            //         alert(value)
            //     }
            // }
            // console.warn(b64[String(data)]);
            // for(i = 1 ; i<b64.length;i++)
            // console.warn(JSON.parse(b64));
            // if (b64[data]) {
            //     alert(b64[data].price)
            // }
            // const wsData = XLSX.utils.sheet_to_json(ws, { header: 1 })
        })
        // if(JsData[data]){
        //     alert(JsData[data].name + ' ' + JsData[data].price)
        // }
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const closeCamera = () => {
        props.open()
    }
    return (
        <View style={styles.container1}>
            {
                BarData &&
                <>
                    {/* <Dialog
                        visible={popup}
                        onTouchOutside={() => {
                            setpopup(false);
                        }}
                    >


                        <Image style={styles.tinyLogo} source={{
                            uri: `${BarData.image}`,
                            resize: 'contain'
                        }}></Image>


                        <DialogContent style={styles.Popup}>
                            <Text>Hello</Text>
                        </DialogContent>
                    </Dialog> */}
                    <TouchableOpacity style={styles.DialogView} onPress={() => {
                        setpopup(false)
                        setBarData(null)
                    }}>

                    </TouchableOpacity>
                    <View style={styles.DialogContant}>
                        <Image style={styles.tinyLogo} source={{
                            uri: `${BarData.image}`,
                            resize: 'contain'
                        }}></Image>
                        <Text>Price : {BarData.price}</Text>
                    </View>

                </>
            }
            {
                popup && !BarData &&
                // <FancyAlert
                //     visible={true}
                //     icon={<View style={{
                //         flex: 1,
                //         display: 'flex',
                //         justifyContent: 'center',
                //         alignItems: 'center',
                //         backgroundColor: 'red',
                //         borderRadius: 50,
                //         width: '100%',
                //     }}><Text style={{
                //         fontWeight:'bold',
                //         fontSize:30
                //     }}>X</Text></View>}
                //     style={{ backgroundColor: 'white',marginBottom: 32}}
                // ><Text style={{
                //     fontSize:15,
                // }}>Not Found</Text><Button title='OK' onPress={()=>{
                //     setpopup(false)
                // }}></Button></FancyAlert>
                <>
                    <TouchableOpacity style={styles.DialogView} onPress={() => {
                        setBarData(null)
                    }}>

                    </TouchableOpacity>
                    <View style={styles.DialogContant2}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            backgroundColor: 'red',
                            alignItems: 'center',
                            borderColor: 'white',
                            borderWidth: 3,
                            marginTop: -20,
                            marginBottom: 10
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 30,
                                lineHeight: 53,
                                color:'white'
                            }}>X</Text>
                        </View>
                        <Text>Not Found</Text>
                        <Pressable title='OK' onPress={() => {
                            setpopup(false)
                        }} style={{
                            marginBottom: 20, marginTop: 10, paddingHorizontal: 40, paddingVertical: 10, backgroundColor: '#FFCD0C', borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                        }}>
                            <Text>OK</Text>
                        </Pressable>
                    </View>
                </>
            }
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
    Popup: {
        // resizeMode:'cover'
    },
    tinyLogo: {
        // position: 'absolute',
        marginTop: -140,
        height: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width / 1.5,
        resizeMode: 'contain',
        zIndex: 999,
    },
    DialogView: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 20
    },
    DialogContant: {
        position: 'absolute',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width / 1.2,
        height: Dimensions.get('screen').height / 3,
        zIndex: 60,
        backgroundColor: 'white',
        opacity: 1,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    DialogContant2: {
        position: 'absolute',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width / 1.2,
        // height: Dimensions.get('screen').height / 3,
        zIndex: 60,
        backgroundColor: 'white',
        opacity: 1,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }

});

export default OpenCamera;
