import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,ScrollView,TouchableWithoutFeedback,Image } from 'react-native'
import {FAB,Card} from 'react-native-paper'

const lisproduct = ({navigation}) => {
    const [dataProduct, setdataProduct] = useState([]);
    const [loading, setloading] = useState(true);
    

    const getData = () => {
        fetch('http://10.82.64.103:3000/product-data')
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
            <Text>{item.name}</Text>
            <Text style={styles.styprice}>{item.price}</Text>
            <Text></Text>
          </Card>
          </TouchableWithoutFeedback>
        );
      };

    return (
        <View style={styles.container}>
              {<FlatList
              data={dataProduct}
              renderItem={({item}) => {
                return _renderItem(item);
              }}
              keyExtractor={(item) => item._id}
              onRefresh={() => getData()}
              refreshing={loading}></FlatList>}
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
      },
      styImage: {
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      styprice: {
        color: 'red',
      },
})
