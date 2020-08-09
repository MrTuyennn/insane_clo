import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import BackgroundHeader from '../components/BackgroundHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../utils/theme';
import {Card, FAB} from 'react-native-paper';
import PORT from '../utils/port';
import Money from 'react-native-vector-icons/MaterialIcons';
import Star from 'react-native-vector-icons/AntDesign';
import Cart from 'react-native-vector-icons/Entypo';
import ViewCustom from '../components/ViewCustom';
import Hot from 'react-native-vector-icons/MaterialIcons'
const W = Dimensions.get('window').width;
const number = 2;

const Store = ({navigation}) => {
  const [dataProduct, setdataProduct] = useState([]);
  const [dataProductLimit, setdataProductLimit] = useState([]);

  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(0);

  const getData = () => {
    fetch(`http://${PORT}/product-limit`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result + ' ' + 'có dữ liệu');
        setdataProduct(result);
        setloading(false);
      });
  };

  const getData_ = () => {
    fetch(`http://${PORT}/product-limit-data`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result + ' ' + 'có dữ liệu');
        setdataProductLimit(result);
        setloading(false);
      });
  };

  useEffect(() => {
    getData();
    getData_();
  }, []);

  const _renderItem = ({item}) => {
    let {styCard, styImage, styprice} = styles;
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('inforproduct', {item})}>
        <Card style={[styles.styCard]}>
          <Image
            resizeMode="cover"
            style={styles.styImage}
            source={{uri: item.picture}}></Image>
          <Text style={{height: 50, marginHorizontal: 10}}>{item.name}</Text>
          <View style={{flexDirection: 'row', marginHorizontal: 5}}>
            <Money name="attach-money" size={24} color="grey"></Money>
            <Text style={styles.styprice}>{item.price}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="grey"></Star>
              <Star name="star" size={15} color="grey"></Star>
            </View>
            <View style={{marginLeft: 100, marginBottom: 5}}>
              <Cart
                name="shopping-cart"
                size={20}
                color={theme.COLOR_PRIMARY}></Cart>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  const _renderItemLimit = (item) => {
    let {styCard1, styImage1, styprice1} = styles;
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('inforproduct', {item})}>
        <Card style={styles.styCard1}>
          <Image style={styles.styImage1} source={{uri: item.picture}}></Image>
          <Text style={{marginHorizontal: 10, height: 50}}>{item.name}</Text>
          <View style={{flexDirection: 'row', marginHorizontal: 5}}>
            <Money name="attach-money" size={24} color="grey"></Money>
            <Text style={styles.styprice1}>{item.price}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', margin: 5}}>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="red"></Star>
              <Star name="star" size={15} color="grey"></Star>
              <Star name="star" size={15} color="grey"></Star>
            </View>
            <View style={{marginLeft: 100, marginBottom: 5}}>
              <Cart
                name="shopping-cart"
                size={20}
                color={theme.COLOR_PRIMARY}></Cart>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.Header}>
          <BackgroundHeader style={styles.svg}></BackgroundHeader>
          <View style={styles.HeaderContainer}>
            <View style={styles.HeaderAddress}>
              <Icon
                style={{paddingRight: 10, margin: 10}}
                name="map-marker-alt"
                size={25}
                color="white"></Icon>
              <Text
                numberOfLines={2}
                ellipsizeMode="middle"
                style={{margin: 5, color: 'white'}}>
                347/33E Huỳnh Văn Bánh, Phường 11, Quận Phú Nhuận,TP HCM
              </Text>
            </View>
            <View style={styles.titleHeader}>
              <Text style={styles.title}>
                Xin chào, bạn muốn mua gì hôm nay ?
              </Text>
            </View>
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
          </View>
        </View>
        <View style={styles.Body}>
          <View
            style={{
              flexDirection: 'column',
              marginTop: 20,
              marginHorizontal: 10,
            }}>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Có thể bạn quan tâm
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <ViewCustom
                source={require('../assets/images/t-shirt.png')}></ViewCustom>
              <ViewCustom
                source={require('../assets/images/icons8-trousers-100.png')}></ViewCustom>
              <ViewCustom
                source={require('../assets/images/icons8-running-shoe-96.png')}></ViewCustom>
              <ViewCustom
                source={require('../assets/images/icons8-backpack-96.png')}></ViewCustom>
            </View>
          </View>
          <View style={styles.HeaderBody}>
            <Text
              style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 10}}>
              Sản phẩm bán chạy
            </Text>
            <Hot name="whatshot" size={24} color='red'></Hot>
            <TouchableOpacity
              onPress={() => navigation.navigate('listproduct')}
              style={{
                padding: 10,
                position: 'absolute',
                right: 0,
                bottom: -6,
                marginHorizontal: 10,
              }}>
              <Text style={{fontStyle: 'italic'}}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.viewCardContainer,{marginTop:10}]}>
            <FlatList
              data={dataProduct}
              horizontal={true}
              snapToAlignment="center"
              decelerationRate={'fast'}
              pagingEnabled
              snapToInterval={W - 100}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return _renderItem({item});
              }}
              keyExtractor={(item) => item._id}
              onRefresh={() => getData()}
              refreshing={loading}></FlatList>
          </View>
          <View style={{flexDirection:'column'}}>
          <View style={styles.HeaderBody}>
            <Text
              style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 10}}>
              Danh sách sản phẩm
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('listproduct')}
              style={{
                padding: 10,
                position: 'absolute',
                right: 0,
                bottom: -6,
                marginHorizontal: 10,
              }}>
              <Text style={{fontStyle: 'italic'}}>View all</Text>
            </TouchableOpacity>
          </View>
            <FlatList
              data={dataProductLimit}
              renderItem={({item}) => {
                return _renderItemLimit(item);
              }}
              keyExtractor={(item) => item._id}
              onRefresh={() => getData_()}
              refreshing={loading}
              numColumns={number}></FlatList>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%' ,
  },
  Header: {
    flexDirection: 'column',
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  HeaderContainer: {
    position: 'absolute',
    flexDirection: 'column',
  },
  HeaderAddress: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  titleHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
  },
  Viewseach: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 50,
    borderRadius: 10,
  },
  txtsearch: {
    padding: 10,
  },
  Body: {
    marginTop: 40,
    marginHorizontal: 10,
    flexDirection: 'column',
    height: '100%',
  },
  HeaderBody: {
    flexDirection: 'row',
    marginTop: 20,
  },
  styCard: {
    flex: 1,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: W - 300,
    overflow: 'hidden',
    height: 200,
  },
  styImage: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  styprice: {
    color: 'red',
  },
  viewCardContainer: {
    height: 250,
  },
  styCard1: {
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
    height: 250,
  },
  styImage1: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  styprice1: {
    color: 'red',
  },
});
