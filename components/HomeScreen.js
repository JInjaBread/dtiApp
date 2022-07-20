import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { MaterialCommunityIcons, Ionicons, Entypo, FontAwesome5, Octicons} from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import COLORS from '../assets/colors/colors';
import { Icon } from "react-native-elements";
const width = Dimensions.get('window').width / 2 - 30;
export default function HomeScreen({navigation}) {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState();
  const [products2, setProducts2] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getProductsList();
    getProductsList2();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProductsList();
    getProductsList2();
    setRefreshing(false);
  }, []);

  function getProductsList() {
    return fetch("https://dtiapp.herokuapp.com/api/products/basicnecessities", {
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


  function getProductsList2() {
    return fetch("https://dtiapp.herokuapp.com/api/products/primecommodities", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setProducts2(json);
        console.log(user_email)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderProduct({ item }) {
    return (
      <View
        style={{
          // flex: 1,
          width: Dimensions.get("window").width * 0.45,
          // borderWidth: StyleSheet.hairlineWidth,
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          height: 95 + "%",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          // paddingRight: 10,
          marginRight: 10,
        }}
      >
        {/* Like Button Row  */}
        <View
          style={{
            flex: 1,
            position: "absolute",
            // borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            zIndex: 99,
          }}
        >
          <View
            style={{
              // borderWidth: 1,
              flex: 8,
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          ></View>

          <View
            style={{
              // borderWidth: 1,
              flex: 2,
              justifyContent: "flex-end",
            }}
          >
          </View>
        </View>
        {/* Product Image  */}
        <View
          style={{
            flex: 5,
            flexDirection: "column",
            // borderWidth: 1,
            // borderColor: "red",
            justifyContent: "center",
            alignItems: "center",
            width: 80 + "%",
          }}
        >
          {/* Image with custom placeholder content  */}

          <Image
            source={{
              uri: 'https://dtiapp.herokuapp.com' + item.product_image,
            }}
            resizeMode="contain"
            style={{
              height: "100%",
              width: "100%",
            }}
            containerStyle={{
              // borderWidth: 1,
              // borderColor: "blue",
              alignSelf: "flex-start",
              alignContent: "center",
              justifyContent: "flex-start",
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        {/* Product name and cost */}
        <View
          style={{
            flex: 2.5,
            // borderWidth: 1,
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            flexDirection: "column",
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 14 }}>
            SRP: ₱ {item !== null ? item.product_srp : ""}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 12,}}>
            {item !== null ? item.product_name : ""}
          </Text>
          <Text>{item !== null ? item.product_unit: ""}</Text>
        </View>

        <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                item: item,
              })}
          style={{
            flex: 1.5,
            flexDirection: "row",
            // borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: 100 + "%",
            backgroundColor: "#FCBF00",
            marginTop: 20,
            marginRight: 0,
            paddingHorizontal: 0,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>More</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        // borderWidth: 4,
        // borderColor: "red",
        marginTop: 0,
        flexDirection: "column",
      }}
    >

      {/* Search Row */}
      <View
        style={{
          flex: 1,
          // borderWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={style.searchContainer}>
          <TextInput placeholder="Search" style={style.input} onChangeText={(search) => setSearch(search)} />
        </View>
        <TouchableOpacity
        onPress={() =>
          navigation.navigate('Search', {
            search: search,
          })}
         style={style.sortBtn}>
          <Octicons name="search" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      </View>

      {/* Categories Row */}
      <View
        style={{
          flex: 1.5,
          marginTop:20,
          // borderWidth: 1,
          // borderColor: "black",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Basic Category */}
        <TouchableOpacity
          onPress={() =>
           navigation.navigate('Basic')}
          style={{
            width: 30 + "%",
            height: 100 + "%",
            // borderWidth: 1,
            // borderColor: "blue",
            marginRight: 20,
            marginLeft: 10,
            borderRadius: 10,
            backgroundColor: "#E6F2DC",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              height: 75 + "%",
              // borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              // borderColor: "red",
            }}
          >
            <MaterialCommunityIcons name="rice" size={40} color="#436B1C" />
          </View>
          <View
            style={{
              height: 45 + "%",
              // borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "red",
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 10 }}>Basic Necessities</Text>
          </View>
        </TouchableOpacity>

        {/* Repairs Category */}
        <TouchableOpacity
          onPress={() =>
           navigation.navigate('Prime')}
          style={{
            width: 30 + "%",
            height: 100 + "%",
            // borderWidth: 1,
            // borderColor: "blue",
            marginRight: 20,
            marginLeft: 10,
            borderRadius: 10,
            backgroundColor: "#FEF6E1",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              height: 75 + "%",
              // borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              // borderColor: "red",
            }}
          >
            <FontAwesome5 name="briefcase-medical" size={32} color="#436B1C" />
          </View>
          <View
            style={{
              height: 45 + "%",
              // borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "red",
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>Prime Commodities</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Newest Updated Products */}
      <View
        style={{
          flex: 4.5,
          // borderWidth: 1,
          borderColor: "black",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {/*  Title Row */}
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            borderBottomColor: "blue",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 100 + "%",
          }}
        >
          <View
            style={{
              backgroundColor: "#FC5455",
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>BASIC NECESSITIES</Text>
          </View>
          <TouchableOpacity onPress={() =>
            navigation.navigate('Basic')} >
            <Text style={{ color: "#FC5455", marginRight: 10 }}>SEE ALL.</Text>
          </TouchableOpacity>
        </View>

        {/*  Products Row */}
        <View
          style={{
            flex: 9,
            // borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View>
      </View>

      {/* DAILY NEEDS ROW */}
      <View
        style={{
          flex: 4.5,
          // borderWidth: 1,
          borderColor: "black",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {/*  Title Row */}
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            borderBottomColor: "blue",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 100 + "%",
          }}
        >
          <View
            style={{
              backgroundColor: "#0000FF",
              marginLeft: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>PRIME COMMODITIES</Text>
          </View>
          <TouchableOpacity onPress={() =>
            navigation.navigate('Prime')} >
            <Text style={{ color: "#FC5455", marginRight: 10 }}>SEE ALL.</Text>
          </TouchableOpacity>
        </View>

        {/*  Products Row */}
        <View
          style={{
            flex: 9,
            // borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <FlatList
            data={products2}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View>
      </View>
    </View>
  );
}
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
    backgroundColor: COLORS.light,
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
    borderWidth: 1,
    borderColor: COLORS.dark,
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
HomeScreen.navigationOptions = {
  headerShown: false,
};
