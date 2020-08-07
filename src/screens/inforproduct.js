import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Card} from 'react-native-paper';
import theme from '../utils/theme';
import PORT from '../utils/port'
const inforproduct = (props, {navigation}) => {
  const {_id, picture, name, size, price, infor} = props.route.params.item;
  console.log(_id, picture, name, size, price);
  console.log('đây là picture' + ' ' + picture);

  const deleteProduc = () => {
    fetch(`http://${PORT}/delete-data/`+ _id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => 
        res.json()
      ).then((json) => {
        ToastAndroid.show('Xóa thành công sản phẩm',ToastAndroid.SHORT);
        navigation.popToTop('store')
        console.log(json)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dialog = () => {
    Alert.alert(
      'Thông báo !!!',
      'Bạn có muốn xóa sản phẩm' + ' ' + name,
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteProduc()},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.plus}>
        <View style={styles.viewImage}>
          <Image
            style={{height: 200, width: 200, borderRadius: 20}}
            source={{uri: picture}}
          />
        </View>
        <Card style={styles.myCard}>
          <Text style={styles.title}>Tên sản phẩm : {name}</Text>
        </Card>

        <Card style={styles.myCard}>
          <Text style={styles.title}>Size : {size}</Text>
        </Card>
        <Card style={styles.myCard}>
          <Text style={styles.title}>Giá sản phẩm : {price}</Text>
        </Card>
        <Card style={styles.myCard}>
          <Text style={styles.title}>Thông tin về sản phẩm : {infor}</Text>
        </Card>

        <View style={styles.ViewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate('update', {
                _id: _id,
                picture: picture,
                name: name,
                size: size,
                price: price,
                infor: infor,
              })
            }>
            <Text style={styles.textbutton}>Cập nhập sản phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => dialog()}>
            <Text style={styles.textbutton}>Xóa sản phẩm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default inforproduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plus: {
    margin: 10,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
  myCard: {
    flexDirection: 'row',
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 5,
  },
  title: {
    fontSize: 20,
  },
  ViewButton: {
    flexDirection: 'row',
    margin: 5,
  },
  button: {
    margin: 15,
    borderRadius: 20,
    backgroundColor: theme.COLOR_PRIMARY,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbutton: {
    color: 'white',
  },
});
