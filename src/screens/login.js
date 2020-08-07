import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ToastAndroid,
   
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../utils/theme';
import {TextInput} from 'react-native-paper';
import ButtonCustom from '../components/ButtonCustom';
import Loading from '../components/Loading';
import PORT from '../utils/port'
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [progressSimple, setprogressSimple] = useState(false);
  

  const toggleProgress= () => {
    progressSimple ? false : true;
  }

  const checkLogin = (name, password) => {
    if (email == '' || password == '') {
      ToastAndroid.show('Không để trống thông tin', ToastAndroid.SHORT);
      return false;
    } else return true;
  };

  const loginUser = async () => {

    if (checkLogin(email, password)) {
      
      const res = await fetch(`http://${PORT}/singin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: email,
          password: password,
        }),
      });

      const resResult = await res.json();
      console.log(resResult + ' kết quả sever trả về ');
      const {data, api_code} = resResult;
      if (api_code === 200) {
        ToastAndroid.show('Login Thành Công', ToastAndroid.SHORT);
        setprogressSimple(true);
        setloading(true)
        toggleProgress()
        await AsyncStorage.setItem('id_user',data._id)
        navigation.navigate('homeNavigation')
        console.log(data._id + "id user")
      } else {
        ToastAndroid.show('Err : Email hoặc mật khẩu không chính xác', ToastAndroid.SHORT);
      }
    }
  };

  return (
       <SafeAreaView style={styles.container}>
       <Loading flag={progressSimple} ></Loading>
          <View style={styles.viewImage}>
            <Image source={theme.IMGAE}></Image>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.title}>Log In</Text>
            <View style={styles.Input}>
              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(email) => setemail(email)}
                theme={theming}
                placeholder="Nhập email ..."
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={(password) => setpassword(password)}
                theme={theming}
                placeholder="Nhập password ..."
                secureTextEntry
              />
            </View>
            <View style={styles.Viewbutton}>
              <ButtonCustom
                color={{color: 'white', fontSize: 20}}
                style={styles.button}
                title="Đăng Nhập"
                onPress={() => loginUser()}></ButtonCustom>
            </View>
            <View style={styles.Viewbutton}>
              <ButtonCustom
                color={{color: 'white', fontSize: 20}}
                style={styles.button}
                title="Đăng Kí"
                onPress={() => navigation.navigate('register')}></ButtonCustom>
            </View>
          </View>
        </SafeAreaView>
  );
};

export default login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewImage: {
    height: Dimensions.get('window').height / 1.5,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: WIDTH,
    height: HEIGHT / 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 35,
    color: 'gray',
    fontWeight: 'bold',
  },
  Viewbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
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
  Input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
const theming = {
  colors: {
    primary: theme.COLOR_PRIMARY,
  },
};
