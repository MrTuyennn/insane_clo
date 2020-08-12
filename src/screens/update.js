import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image, ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import theme from '../utils/theme';
import ButtonCustom from '../components/ButtonCustom';
import PORT from '../utils/port'
const update = ({route, navigation}) => {
  const getDeltal = (type) => {
    if (route.params) {
      switch (type) {
        case 'picture':
          return route.params.picture;
        case 'name':
          return route.params.name;
        case 'size':
          return route.params.size;
        case 'infor':
          return route.params.infor;
        case 'price':
          return route.params.price;
      }
    }
    return '';
  };

  const [name, setname] = useState(getDeltal('name'));
  const [price, setprice] = useState(getDeltal('price'));
  const [infor, setinfor] = useState(getDeltal('infor'));
  const [size, setsize] = useState(getDeltal('size'));
  const [picture, setpicture] = useState(getDeltal('picture'));

  console.log(price);

  const update_store = (dataImage) => {
    console.log(dataImage + ' ' + 'đây là dataImage');
    fetch(`http://${PORT}/update-data/` + route.params._id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture: picture,
        name: name,
        price: price,
        size: size,
        infor: infor,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show('Cập nhập sản phẩm thành công', ToastAndroid.SHORT);
        navigation.navigate('listproduct');
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.plus}>
        <View style={styles.ViewImage}>
          <View>
            <Image
              source={{uri: picture}}
              style={{height: 200, width: 200, borderRadius: 20}}></Image>
          </View>
        </View>
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
            onPress={() => update_store()}
            style={styles.button}
            title="Xác nhận cập nhập"
            color={{color: 'white'}}></ButtonCustom>
          <ButtonCustom
            onPress={() => navigation.navigate('store')}
            style={styles.button}
            title="Hủy"
            color={{color: 'white'}}></ButtonCustom>
        </View>
      </View>
    </View>
  );
};

export default update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plus: {
    margin: 10,
    height: Dimensions.get('window').height,
  },
  ViewImage: {
    justifyContent: 'center',
    alignItems: 'center',
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
