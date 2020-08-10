import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    SafeAreaView
} from 'react-native';
import ButtonCustom from '../components/ButtonCustom';
import theme from '../utils/theme';
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Loading from '../components/Loading'
import PORT from '../utils/port'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const register = ({ navigation }) => {
    const [avatar, setavatar] = useState('');
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [gmail, setgmail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordconfig, setpasswordconfig] = useState('');
    const [isLoad, setisLoad] = useState(false);
    const [loading, setloading] = useState(false);
    const [progressSimple, setprogressSimple] = useState(false);
  

  const toggleProgress= () => {
    progressSimple ? false : true;
  }
    const _sumitData = (name, phone, gmail, password, passwordconfig) => {
        if (
            name == '' &&
            phone == '' &&
            gmail == '' &&
            password == '' &&
            passwordconfig == ''
        ) {
            ToastAndroid.show('nhap day du !!!', ToastAndroid.SHORT);
            return false;
        } else if (password !== passwordconfig) {
            ToastAndroid.show(' mat khau khong khop!!!', ToastAndroid.SHORT);
            return false;
        } else return true;
    };
    // up ảnh lên firebse stogare
    const _UploadTostorages = async () => {
        if (_sumitData(name, gmail, phone, password, passwordconfig)) {
            setloading(true);
            let fileName = Math.random().toString(16).split(2);
            let ext = avatar.fileName.split('.').pop();
            console.log(' đây là fileName' + ' ' + fileName);
            console.log(' đây là ext' + ' ' + ext);
            // //  Dành cho nếu có sử dụng them ios// if(Platform.OS === 'ios'){//     ext = picture.uri.split('.').pop()// }else{// }
            console.log(avatar.uri + ' ' + 'picture');
            console.log(avatar);
            let storageRef = storage().ref().child(`images_Avatar/${fileName}.${ext}`);
            const uploadTask = storageRef.putFile(avatar.path);
            let response = new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                addUser(result);
            });
        }

    };

    const addUser = async (result) => {
        toggleProgress()
        const res = await fetch(`http://${PORT}/singup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: result,
                name: name,
                phone: phone,
                gmail: gmail,
                password: password,
            }),
        });
        const resJson = await res.json();
        console.log(resJson);
        const { api_status, api_message } = resJson;
        if (api_status === 200) {
            ToastAndroid.show(' ' + api_message, ToastAndroid.SHORT);
            setloading(false);
            toggleProgress()
            navigation.navigate('login');
        } else {
            ToastAndroid.show('alo :' + api_message, ToastAndroid.SHORT);
        }

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
                setavatar(response);
                setisLoad(true);
            }
        });
    };

    return (


        <SafeAreaView>
        <Loading flag={progressSimple} />
            <View styles={styles.container}>

                {isLoad == false ? (
                    <View style={styles.View}>
                        <View style={styles.ViewImage}>
                            <Image
                                source={require('../assets/images/icons8-user.png')}
                                style={styles.image}></Image>
                            <TouchableOpacity
                                style={styles.Viewicon}
                                onPress={() => _uploadImage()}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/icons/icons8-plus.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                        <View style={styles.View}>
                            <View style={styles.ViewImage}>
                                <Image source={avatar} style={styles.image}></Image>
                                <TouchableOpacity
                                    style={styles.Viewicon}
                                    onPress={() => _uploadImage()}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../assets/icons/icons8-plus.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                <View style={styles.Viewinput}>
                    <TextInput
                        mode="outlined"
                        label="Tên người dùng"
                        value={name}
                        onChangeText={(name) => setname(name)}
                        theme={theming}
                        placeholder="Nhập tên người dùng ..."
                    />
                </View>
                <View style={styles.Viewinput}>
                    <TextInput
                        mode="outlined"
                        label="Số điện thoại"
                        value={phone}
                        onChangeText={(phone) => setphone(phone)}
                        theme={theming}
                        placeholder="Nhập số điện thoại ..."
                    />
                </View>
                <View style={styles.Viewinput}>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={gmail}
                        onChangeText={(gmail) => setgmail(gmail)}
                        theme={theming}
                        placeholder="Nhập Email ..."
                    />
                </View>
                <View style={styles.Viewinput}>
                    <TextInput
                        mode="outlined"
                        label="Mật khẩu"
                        value={password}
                        onChangeText={(password) => setpassword(password)}
                        theme={theming}
                        placeholder="Nhập mật khẩu ..."
                        secureTextEntry
                    />
                </View>
                <View style={styles.Viewinput}>
                    <TextInput
                        mode="outlined"
                        label="Config mật khẩu"
                        value={passwordconfig}
                        onChangeText={(passwordconfig) => setpasswordconfig(passwordconfig)}
                        theme={theming}
                        placeholder="Nhập lại mật khẩu ..."
                        secureTextEntry
                    />
                </View>
                <View style={styles.View}>
                    <ButtonCustom
                        onPress={() =>
                            _UploadTostorages()
                        }
                        color={{ color: 'white', fontSize: 20 }}
                        style={styles.button}
                        title="Đăng Kí"></ButtonCustom>
                </View>
            </View>
        </SafeAreaView>

    );
};

export default register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: HEIGHT,
    },
    View: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH,
        height: HEIGHT / 7,
        marginVertical: 10,
    },
    Viewinput: {
        marginHorizontal: 20,
        marginVertical: 15,
    },
    ViewImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH / 3,
        height: '100%',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 20,
    },
    Viewicon: {
        position: 'absolute',
        height: 30,
        width: 30,
        bottom: 0,
        right: 20,
    },
    icon: {
        height: '100%',
        width: '100%',
    },
    button: {
        height: 50,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
const theming = {
    colors: {
        primary: theme.COLOR_PRIMARY,
    },
};
