import React from 'react';
import {
  Alert, Dimensions,
  Image,



  ScrollView, StyleSheet,
  Text,





  ToastAndroid, TouchableOpacity, View
} from 'react-native';
import { default as Heart, default as Star } from 'react-native-vector-icons/AntDesign';
import PORT from '../utils/port';
import theme from '../utils/theme';

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
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.plus}>
        <View style={styles.viewImage}>
          <Image
            style={{height: '100%', width: '100%', borderBottomLeftRadius: 20,borderBottomRightRadius:20}}
            source={{uri: picture}}
          />
        </View>
        <View style={{width:Dimensions.get('window').width,flexDirection:'column'}}>
          <Text style={[styles.title,{fontWeight: 'bold'}]}>{name}</Text>
          <View style={{width:Dimensions.get('window').width,flexDirection:'row',alignItems:'center'}}>
            <Text style={[styles.title,{marginHorizontal:10,color:'red',fontWeight: 'bold'}]}>{price} ₫  </Text>
            <TouchableOpacity style={[styles.button,{marginLeft:95}]}>
            <Text style={styles.textbutton}>Mua sản phẩm</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:Dimensions.get('window').width,flexDirection:'row',alignItems:'center',margin:10}}>   
            <Text>_________</Text>
            <View style={{flexDirection:'row',alignItems:'center',position:'absolute',right: 60}}>
            <Text>4.5</Text>
            <Star name="star" size={15} color="black"></Star>
          </View>
          </View>
          <View style={{width:'100%',flexDirection:'row',alignItems:'center',margin:10,height:100}}>
          <Text style={[styles.title,{fontSize:14,width:350}]}> {infor}</Text>
          <View style={{height:50,width:100,backgroundColor:theme.COLOR_PRIMARY,borderRadius:20,flexDirection:'row'}}>
          <View style={{justifyContent: 'center',alignItems: 'center',flexDirection:'row'}}>
          <Heart style={{margin:10}} name='heart' color='white' size={24}></Heart>
          <Text  style={{color:'white'}}>|</Text>
          <Heart  style={{margin:10}} name='shoppingcart' color='white' size={24}></Heart>
          </View>
          </View>
          </View>
            
        </View>
      

        
        

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
    </ScrollView>
  );
};

export default inforproduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plus: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 550,
    width: Dimensions.get('window').width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20
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
    fontSize: 25,
    margin:10,
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
