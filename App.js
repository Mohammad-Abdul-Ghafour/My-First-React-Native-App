import { StyleSheet, Text, View, Button , TouchableOpacity , Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from "react"

export default function App() {
  const [permission, setpermission] = useState(false);
  const [openCamera, setopenCamera] = useState(Camera.Constants.Type.back);
  const getPermission = async () => {

  }
  const getOpenCamera = async () => {
    if (permission === true) {
      // return <View />;
    }
    if (permission === false) {
      return <Text>No access to camera</Text>;
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setpermission(status === 'granted'? true : false);
    })();
  }, []);

  

  return (
    <View style={styles.container}>
      <View style={styles.AppBar}>

      </View>
    {/* <Camera style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera> */}
    {/* <Button onPress={getOpenCamera} /> */}
    <TouchableOpacity activeOpacity={0.7} onPress={getOpenCamera} style={styles.floatButton}>

    <Ionicons name='camera' size={20} style={styles.button}/>
    </TouchableOpacity>
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
  button:{
    backgroundColor: 'red',
    borderRadius: 60,
    height: 60,
    width:60,
    textAlign:'center',
    lineHeight:60,
    fontSize:30,
    color: 'white',
  },
  floatButton:{
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  AppBar:{
    backgroundColor:'#FFCD0C',
    height:Dimensions.get('screen').height/3,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top:0,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
});
