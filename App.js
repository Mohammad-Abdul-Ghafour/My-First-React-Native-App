import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react"
import OpenCamera from './Camera'
import XLSX from 'xlsx'

export default function App() {
  const [permission, setpermission] = useState(false);
  const [open, setOpen] = useState(true);
  const getPermission = async () => {

  }
  const getOpenCamera = async () => {
    setOpen(open === false? true:false)
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setpermission(status === 'granted' ? true : false);
    })();
    // (async () => {
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   setHasPermission(status === 'granted');
    // })();
  }, []);



  return (
    <View style={styles.container}>
    { open &&
      <>
      <View style={styles.AppBar}>
        <Text style={styles.title} >BarCode Scaner</Text>
      </View>

      <TouchableOpacity activeOpacity={0.5} onPress={getOpenCamera} style={styles.floatButton}>

        <Ionicons name='camera' style={styles.button} />
      </TouchableOpacity>
      </>
    }
    {
      !open &&
      <View>
        <OpenCamera open={getOpenCamera}/>
      </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // backgroundColor: '#FFCD0C',
    // borderRadius: 60,
    height: 60,
    width: 60,
    textAlign: 'center',
    lineHeight: 60,
    fontSize: 30,
    color: 'white',

  },
  floatButton: {
    position: 'absolute',
    width: 60,
    backgroundColor: '#FFCD0C',
    borderRadius: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  AppBar: {
    backgroundColor: '#FFCD0C',
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    top: 40,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
