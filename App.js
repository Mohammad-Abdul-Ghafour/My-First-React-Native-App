import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Switch } from 'react-native';
// import { SliderBase } from '@react-native-community/slider';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useState, useEffect } from "react"
import OpenCamera from './Camera'
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx'
import * as DocumentPicker from 'expo-document-picker';
import logo from './assets/favicon.png'
// import ParcodeData from './ParcodeData.json';
// import { writeFile, readFile } from 'react-native-fs';

export default function App() {
  const [permission, setpermission] = useState(false);
  const [open, setOpen] = useState(true);
  const [excel, setExcel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  const getPermission = async () => {

  }
  const getOpenCamera = async () => {
    setOpen(open === false ? true : false)
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setpermission(status === 'granted' ? true : false);
    })();
  }, []);

  const SideBar = () => {
    setMenu(true)
  }


  /* read a workbook */
  // readFile(file, 'ascii').then((res) => {
  //   const workbook = XLSX.read(res, {type:'binary'});
  //   /* DO SOMETHING WITH workbook HERE */
  //   alert('text')
  // });
  const readFile = async () => {
    let file = await DocumentPicker.getDocumentAsync()
    console.warn(file)
    // let x = await FileSystem.getInfoAsync(file.uri)
    // console.warn(x)
    if (!file.name.includes('.xlsx')) {
      alert('Please Choose .xlsx File')
    } else {
      setExcel(file)
      let file2 = FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.Base64 }).then(
        b64 => {
          let wb = XLSX.read(b64, { type: "base64" })
          const wsName = wb.SheetNames[0]
          const ws = wb.Sheets[wsName]
          const wsData = XLSX.utils.sheet_to_json(ws, { header: 1 })
          console.warn(wsData)
          let dect = {}
          for (let i = 1; i < wsData.length; i++) {
            // console.warn(555,i);
            dect[wsData[i][0]] = {}
            for (let j = 1; j < wsData[i].length; j++) {
              // console.warn(2222,i,j,i[0]);
              // dect[wsData[i][0]]={...wsData[i][0],[wsData[0][j]]:wsData[i][j]}
              dect[wsData[i][0]][wsData[0][j]] = wsData[i][j]
            }
          }
          console.warn(11111, dect);
          if (FileSystem.documentDirectory + "ParcodeData.json") {
            console.warn(FileSystem.documentDirectory + "ParcodeData.json")
            FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "ParcodeData.json", JSON.stringify(dect))
          }
          // ParcodeData = ws
        })
    }
  }

  return (
    <View style={styles.container}>
      {
        menu &&
        <>
          <TouchableOpacity style={styles.DialogView} onPress={() => {
            setMenu(false)
          }}>

          </TouchableOpacity>
          <View style={styles.DialogContant}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
              // borderWidth:0,
              // borderBottomWidth: 1,
              // borderBottomColor:'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 20,
              },
              shadowRadius: 3.84,
              shadowOpacity: 1,

              elevation: 4,
              marginBottom: 20
            }}>
              <Text style={{
                marginTop: 70,
                fontSize: 30,
                color: 'black',
                zIndex: 999,
                // position:'absolute'
              }}>App Menu</Text>
            </View>
            
            <View style={{
              flex: 4,
              flexDirection: 'row',
              // alignItems:'baseline',
              height:20,
              width:250,
              justifyContent:'space-between',
              // backgroundColor:'blue',
            }}>
              <Text style={{
                fontSize:18,
                marginTop:10
              }}>Import Image</Text>
              <View style={{
                // height:50,
                // backgroundColor:'red'
              }}>

              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              </View>
            </View>

            <View style={{
              flex:1.5,
              // backgroundColor:'red',
              alignItems:'center'
            }}>

            <Image style={styles.tinyLogo} source={require('./assets/favicon.png')}></Image>
            </View>

          </View>
        </>
      }
      {open &&
        <>
          <View style={styles.AppBar}>
            <Text style={styles.title} >BarCode Scaner</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={SideBar} style={styles.floatListButton}>

              <Feather name='list' style={styles.Listbutton} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={readFile} style={styles.ImportBTN}>
            <Text style={styles.ImportText}>Import</Text>
            <MaterialCommunityIcons name='microsoft-excel' style={styles.Excel}></MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={getOpenCamera} style={styles.ExportBTN}>
            <Text style={styles.ImportText}>Export</Text>
            <MaterialCommunityIcons name='microsoft-excel' style={styles.Excel}></MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={getOpenCamera} style={styles.floatButton}>

            <Ionicons name='camera' style={styles.button} />
          </TouchableOpacity>
        </>
      }
      {
        !open &&
        <View>
          <OpenCamera open={getOpenCamera} />
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
    borderColor: '#FFCD0C',
    borderWidth: 2,
    // borderLeftWidth:5,
    borderBottomWidth: 1,
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
    height: Dimensions.get('screen').height / 8,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    top: 50,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  ImportBTN: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').height / 8,
    top: 150,
    left: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    alignItems: 'center',
  },
  ImportText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  Excel: {
    fontSize: 70,
    color: 'green',
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  ExportBTN: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').height / 8,
    top: 150,
    right: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    alignItems: 'center',
    zIndex: 0,
  },
  Listbutton: {
    height: 60,
    width: 60,
    textAlign: 'center',
    lineHeight: 60,
    fontSize: 30,
    color: 'white',

  },
  floatListButton: {
    position: 'absolute',
    width: 60,
    borderRadius: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 8,
  },
  DialogView: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 60
  },
  DialogContant: {
    position: 'absolute',
    borderRadius: 10,
    width: Dimensions.get('screen').width / 1.4,
    height: Dimensions.get('screen').height,
    // flex:1,
    zIndex: 70,
    backgroundColor: 'white',
    opacity: 1,
    right: -2,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  tinyLogo: {
    // position: 'absolute',
    // backgroundColor:'blue',
    // marginTop: -140,
    height: Dimensions.get('screen').height / 6,
    width: Dimensions.get('screen').width / 2,
    resizeMode: 'contain',
    zIndex: 999,
    marginTop: 15
    // lineHeight:200
  },
});
