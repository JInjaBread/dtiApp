import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import COLORS from '../assets/colors/colors';
const width = Dimensions.get('window').width / 2 - 30;

export default function SearchScreen({route, navigation}){
  const search = navigation.getParam('search')
  const [products, setProducts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getProductsList();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProductsList();
    setRefreshing(false);
  }, []);

  function getProductsList() {
    return fetch("https://dtiapp.herokuapp.com/api/products?search="+search, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderItem({item}){

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })}
        activeOpacity={0.8}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end'}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            </View>
          </View>

          <View
            style={{
              height: 95,
              //alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://dtiapp.herokuapp.com/' + item.product_image,
              }}
              style={{flex: 1, resizeMode: 'contain', height: "100%", width: "100%",}}
            />
          </View>

          <Text style={{fontSize: 14,  marginTop: 10}}>
            SRP: ₱{item.product_srp}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            {item.product_name}
          </Text>
          <Text style={{fontSize: 14}}>
            {item.product_unit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.light}}>
      <View style={style.header}>
        <View>
          <Text style={{fontSize: 20, color: COLORS.green, fontWeight: 'bold'}}>
            Search Result
          </Text>
        </View>
      </View>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.white,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

SearchScreen.navigationOptions = {
  headerShown: false,
};
