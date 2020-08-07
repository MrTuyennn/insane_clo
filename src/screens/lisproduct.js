import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,ScrollView,TouchableWithoutFeedback,Image,TextInput } from 'react-native'
import {FAB,Card} from 'react-native-paper'
import Money from 'react-native-vector-icons/MaterialIcons'
import Star from 'react-native-vector-icons/AntDesign'
import Cart from 'react-native-vector-icons/Entypo'
import theme from '../utils/theme'
import PORT from '../utils/port'
import Icon from 'react-native-vector-icons/FontAwesome5';

const number = 2
const lisproduct = ({navigation}) => {
    const [dataProduct, setdataProduct] = useState([]);
    const [loading, setloading] = useState(true);
    

    const getData = () => {
        fetch(`http://${PORT}/product-data`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result + ' ' + 'có dữ liệu');
            setdataProduct(result);
            setloading(false);
          });
      };
    
      useEffect(() => {
        getData();
      }, []);

      const _renderItem = (item) => {
        let {styCard, styImage, styprice} = styles;
        return (
          <TouchableWithoutFeedback onPress={() =>navigation.navigate('inforproduct',{item})}>
          <Card style={styles.styCard}>
            <Image style={styles.styImage} source={{uri: item.picture}}></Image>
            <Text style={{marginHorizontal:10,height:50}}>{item.name}</Text>
            <View style={{flexDirection: 'row',marginHorizontal:5}}>
            <Money name="attach-money" size ={24} color='grey'></Money>
            <Text style={styles.styprice}>{item.price}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection:'row',margin:5}}>
              <Star name='star' size={15} color='red'></Star>
              <Star name='star' size={15} color='red'></Star>
              <Star name='star' size={15} color='red'></Star>
              <Star name='star' size={15} color='grey'></Star>
              <Star name='star' size={15} color='grey'></Star>
            </View>
            <View style={{marginLeft:100,marginBottom:5}}>
              <Cart name='shopping-cart' size={20} color={theme.COLOR_PRIMARY}></Cart>
            </View>
            </View>
          </Card>
          </TouchableWithoutFeedback>
        );
      };

    return (
        <View style={styles.container}>
        <View style={styles.Viewseach}>
            <Icon
              style={{padding: 10}}
              name="search"
              color={theme.COLOR_PRIMARY}
              size={25}></Icon>
            <TextInput
              style={styles.txtsearch}
              placeholder="Tìm kiếm sản phẩm ..."></TextInput>
          </View>
              {<FlatList
              data={dataProduct}
              renderItem={({item}) => {
                return _renderItem(item);
              }}
              keyExtractor={(item) => item._id}
              onRefresh={() => getData()}
              refreshing={loading}
              numColumns={number}></FlatList>}
             <ScrollView></ScrollView>
            <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => navigation.navigate('addstore')}
        />
        </View>
    )
}

export default lisproduct

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      styCard: {
        flex: 1,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
        borderRadius: 10,
        height:250
      },
      styImage: {
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode:'cover'
      },
      styprice: {
        color: 'red',
      },
      Viewseach: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 50,
        marginTop:20,
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
})
