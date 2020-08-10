import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView, StyleSheet,
  ToastAndroid, TouchableOpacity, View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import ButtonCustom from '../components/ButtonCustom';
import Loading from '../components/Loading';
import PORT from '../utils/port';
import theme from '../utils/theme';

// console.log(port)
const addstore = ({navigation}) => {

  
  const [picture, setpicture] = useState(null);
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [size, setsize] = useState('');
  const [infor, setinfor] = useState('');
  const [text, settext] = useState('');
  const [isLoad, setisLoad] = useState(false);
  const [progressSimple, setprogressSimple] = useState(false);
  

  const toggleProgress= () => {
    progressSimple ? false : true;
  }

  // up ảnh lên firebse stogare
  const _UploadTostorages = async () => {
    let fileName = Math.random().toString(16).split(2);
    let ext = picture.fileName.split('.').pop();
    console.log(' đây là fileName' + ' ' + fileName);
    console.log(' đây là ext' + ' ' + ext);
    // //  Dành cho nếu có sử dụng them ios// if(Platform.OS === 'ios'){//     ext = picture.uri.split('.').pop()// }else{// }
    console.log(picture.uri + ' ' + 'picture');
    console.log(picture);
    let storageRef = storage().ref().child(`images/${fileName}.${ext}`);
    const uploadTask = storageRef.putFile(picture.path);
    let response = new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setprogressSimple(true);
        },
        (error) => {
          reject(error.message);
        },
        // Download hình ảnh từ storage về
        (complete) => {
          complete.ref.getDownloadURL().then(function (downloadURL) {
            resolve(downloadURL);
            console.log('File available at', downloadURL);
          });
        },
      );
    });
    response.then((result) => {
      Add_store(result);
    });
  };

  // thêm sản từ react

  const Add_store = (dataImage) => {
    toggleProgress();
    console.log(dataImage + ' ' + 'đây là dataImage');
    fetch(`http://${PORT}/creat-data`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture: dataImage,
        name: name,
        price: price,
        size: size,
        infor: infor,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show('Thêm sản phẩm thành công', ToastAndroid.SHORT);
        navigation.navigate('store');
        toggleProgress();
        return json;
      })
      .catch((error) => {
        toggleProgress();
        console.log(error);
      });
  };

  //  chọn hình trong camera

  const _uploadImage = () => {
    const options = {
      storageOptions: {
        privateDirectory: true,
        skipBackup: true,
      },
      title: 'Upload Photo',
      mediaType: 'photo',
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        setpicture(response);
        setisLoad(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loading flag={progressSimple} />
      <View style={styles.container}>
        {/* chọn hình ảnh */}
        {isLoad == false ? (
          <View style={styles.Viewimage}>
            <Image
              source={require('../assets/images/icons8-image.png')}
              style={styles.image}></Image>
            <View style={{position: 'absolute', bottom: 8, right: 0}}>
              <TouchableOpacity onPress={() => _uploadImage()}>
                <Image
                  source={require('../assets/images/icons8-camera.png')}
                  style={styles.icon}></Image>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.Viewimage}>
            <Image source={picture} style={styles.image}></Image>
            <View style={{position: 'absolute', bottom: 8, right: 0}}>
              <TouchableOpacity onPress={() => _uploadImage()}>
                <Image
                  source={require('../assets/images/icons8-camera.png')}
                  style={styles.icon}></Image>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Nhập thông tin sản phẩm */}

        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Tên sản phẩm"
            value={name}
            onChangeText={(name) => setname(name)}
            theme={theming}
          />
        </View>
        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Giá sản phẩm"
            value={price}
            onChangeText={(price) => setprice(price)}
            theme={theming}
          />
        </View>
        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Size sản phẩm"
            value={size}
            onChangeText={(size) => setsize(size)}
            theme={theming}
            placeholder="Các Size mặc định S M L XXL"
          />
        </View>
        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Thông tin sản phẩm"
            value={infor}
            onChangeText={(infor) => setinfor(infor)}
            theme={theming}
            clear
          />
        </View>

        <View style={styles.Viewbutton}>
          <ButtonCustom
            onPress={() => _UploadTostorages()}
            style={styles.button}
            title="Thêm sản phẩm"
            color={{color: 'white'}}></ButtonCustom>
          <ButtonCustom
            style={styles.button}
            title="Hủy"
            color={{color: 'white'}}></ButtonCustom>
        </View>
      </View>
      {/* <View visible={progressSimple} style={styles.container}>
      <ActivityIndicator  size="large" color="#00ff00" />
      </View> */}
    </SafeAreaView>
  );
};

export default addstore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Toobar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: theme.COLOR_PRIMARY,
  },
  titleToobar: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Viewimage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 150,
  },
  image: {
    borderRadius: 10,
    height: 200,
    width: 200,
  },
  Input: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  Viewbutton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  button: {
    marginHorizontal: 10,
    height: 50,
    width: 200,
    borderRadius: 10,
  },
});

const theming = {
  colors: {
    primary: theme.COLOR_PRIMARY,
  },
};
