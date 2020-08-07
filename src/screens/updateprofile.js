import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, ToastAndroid } from 'react-native'
import {TextInput} from 'react-native-paper';
import theme from '../utils/theme';
import ButtonCustom from '../components/ButtonCustom'
import PORT from '../utils/port'
const updateprofile = ({route,navigation}) => {

    const {_id,name,phone,avatar,gmail} =route.params.item

    const getDeltal = (type) => {
        if (route.params) {
          switch (type) {
            case 'avatar_item':
              return avatar;
            case 'name_item':
              return name;
            case 'phone_item':
              return phone;
            case 'gmail_item':
              return gmail;
          }
        }
        return '';
      };
    const [isLoad, setisLoad] = useState(false);
    const [name_update,setname] = useState(getDeltal('name_item'));
    const [avatar_update,setavatar] = useState(getDeltal('avatar_item'));
    const [phone_update,setphone] = useState(getDeltal('phone_item'));
    const [gmail_update,setemail] = useState(getDeltal('gmail_item'))
    
    console.log(_id,avatar,name,phone,gmail + " " + "thông tin người dùng")

    const updateUser = async () =>{
      const res = await fetch(`http://${PORT}/update_user/` + _id,{
        method: 'POST',
        headers: {
          Accept : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar:avatar_update,
          name : name_update,
          phone : phone_update,
          gmail : gmail_update,
        })
      })

      const Result_data = await res.json();
      console.log(Result_data+"bhbhjbjhbj")
      const {api_status,data,api_message} = Result_data
      if(Result_data === 200){
        console.log(Result_data + " datr ")
        ToastAndroid.show('data'+" "+ api_message,ToastAndroid.SHORT)
        navigation.popToTop('profile')
        
      }else{
        ToastAndroid.show(' ' + api_message,ToastAndroid.SHORT)
      }
    }

    return (
        <View style={styles.container}>
            {/* chọn hình ảnh */}
        {isLoad == true ? (
          <View style={styles.Viewimage}>
            <Image
              source={require('../assets/images/icons8-image.png')}
              style={styles.image}></Image>
            <View style={{ position: 'absolute', bottom: 8, right: 0 }}>
              <TouchableOpacity 
            //   onPress={() => _uploadImage()}
            >
                <Image
                  source={require('../assets/images/icons8-camera.png')}
                  style={styles.icon}></Image>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
            <View style={styles.Viewimage}>
              <Image source={{uri:avatar_update}} style={styles.image}></Image>
              <View style={{ position: 'absolute', bottom: 8, right: 0 }}>
                <TouchableOpacity 
                // onPress={() => _uploadImage()}
                >
                  <Image
                    source={require('../assets/images/icons8-camera.png')}
                    style={styles.icon}></Image>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Tên sản phẩm"
            value={name_update}
            onChangeText={(name) => setname(name)}
            theme={theming}
          />
        </View>

        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Tên sản phẩm"
            value={phone_update}
            onChangeText={(phone) => setphone(phone)}
            theme={theming}
          />
        </View>

        <View style={styles.Input}>
          <TextInput
            mode="outlined"
            label="Tên sản phẩm"
            value={gmail_update}
            onChangeText={(gmail) => setemail(gmail)}
            theme={theming}
          />
        </View>

        <View style={styles.Viewbutton}>
          <ButtonCustom
            onPress={() => updateUser()}
            style={styles.button}
            title="Thêm sản phẩm"
            color={{ color: 'white' }}></ButtonCustom>
          <ButtonCustom
            onPress={() => navigation.navigate('profile')}
            style={styles.button}
            title="Hủy"
            color={{ color: 'white' }}></ButtonCustom>
        </View>
        </View>
    )
}

export default updateprofile

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    Viewimage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 150,
        marginTop:20
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
})
const theming = {
    colors: {
      primary: theme.COLOR_PRIMARY,
    },
  };
