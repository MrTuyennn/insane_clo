import React, {useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ButtonCustom from '../components/ButtonCustom';
import theme from '../utils/theme';

const changepass = ({navigation, route}) => {
  const {_id, password} = route.params.item;
  console.log(_id, password);

  const [passwordOld, setpasswordOld] = useState('');
  const [passwordNew, setpasswordNew] = useState('');
  const [passwordConfig, setpasswordConfig] = useState('');

  const _sumitData = (password, passwordOld, passwordNew, passwordConfig) => {
    if ( passwordNew == '' && passwordConfig == '') {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
      return false;
    } else if (passwordNew !== passwordConfig) {
      ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.SHORT);
      return false;
    } else if (password !== passwordOld) {
      ToastAndroid.show('Mật khẩu hiện tại không đúng', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  };

  const ConfigData = async () => {
    if (_sumitData(password, passwordOld, passwordNew, passwordConfig)) {
    const res =  await  fetch(`http://${PORT}/change_password/` + _id,{
        method: 'POST',
        headers: {
          Accept : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password : passwordNew
        })
      })
      const Result_data = await res.json();
      console.log(Result_data)
      console.log('cập nhập thành công')
      ToastAndroid.show('Cập nhập password thành công', ToastAndroid.SHORT)
      navigation.goBack()

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Viewinput}>
        <TextInput
          mode="outlined"
          label="Nhập mật khẩu hiện tại"
          theme={theming}
          placeholder="Nhập mật khẩu hiện tại ..."
          value={passwordOld}
          onChangeText={(text) => setpasswordOld(text)}
        />
      </View>
      <View style={styles.Viewinput}>
        <TextInput
          mode="outlined"
          label="Nhập mật khẩu mới"
          theme={theming}
          placeholder="Nhập mật khẩu mới ..."
          value={passwordNew}
          onChangeText={(text) => setpasswordNew(text)}
        />
      </View>
      <View style={styles.Viewinput}>
        <TextInput
          mode="outlined"
          label="Xác nhận lại mật khẩu"
          theme={theming}
          placeholder="Xác nhận lại mật khẩu ..."
          value={passwordConfig}
          onChangeText={(text) => setpasswordConfig(text)}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <ButtonCustom
          onPress={() => ConfigData()}
          color={{color: 'white', fontSize: 20}}
          style={styles.button}
          title="Cập nhập"></ButtonCustom>
        <ButtonCustom
          color={{color: 'white', fontSize: 20}}
          style={styles.button}
          title="Hủy"></ButtonCustom>
      </View>
    </View>
  );
};

export default changepass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Viewinput: {
    marginHorizontal: 20,
    marginVertical: 15,
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
