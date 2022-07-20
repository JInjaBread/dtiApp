import { NavigationHelpersContext } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import COLORS from '../assets/colors/colors';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Button,
  Linking
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
const options={
  title: "Select Image",
  type: "Library",
  options: {
    maxHeight: 450,
    maxWidth: 250,
    selectionLimit: 1
  }
}

export default function DetailsScreen({route, navigation}){
  const item = navigation.getParam('item')
  const user_email = navigation.getParam('user_email')
  const [email, changeEmail] = useState(null);
  const [message, changeBody] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [url, setUrl] = useState();
  const [user, setUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('u_mail')
    if(value !== null) {
      setUser(value)
    }
  } catch(e) {
    console.log(e)
  }
}
  function geUser() {
    return fetch("https://dtiapp.herokuapp.com/api/current_user", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json.email);
        console.log(json.email)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sendComplains() {

    if(message != null && result != null){
      const data = new FormData();

      data.append('receipt_image', result.base64)
      data.append('complainant_email', user)
      data.append('complains', message)

      return fetch("https://dtiapp.herokuapp.com/api/products/complaints", {
        method: 'POST',
        body: data,
        header: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((json) => {
          alert('Complaints sent succesfully!')
          this.email = ''
          this.image = ''
        })
        .catch((error) => {
          console.log(data)
        });
    }else{
      alert('Please Complete the Form')
    }



    }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });



    if (!result.cancelled) {
      let r = (Math.random() + 1).toString(36).substring(7);
      setImage(result.uri);
      setResult(result)
      console.log(result.uri);
    }
  };

  return (
    <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={style.header}>
          <MaterialCommunityIcons name="chevron-left-box-outline" onPress={() => navigation.goBack()} size={28} color="black" />
        </View>
        <View style={style.imageContainer}>
          <Image source={{
            uri: 'https://dtiapp.herokuapp.com' + item.product_image,
          }} style={{resizeMode: 'contain', flex: 1,}} />
        </View>
        <View style={style.detailsContainer}>
          <ScrollView>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.product_name}</Text>
            </View>
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color:'blue',}}>Prices</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              lineHeight: 22,
              marginTop: 10,
            }}>
            SRP: ₱ {item.product_srp}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              lineHeight: 22,
              marginTop: 10,
            }}>
            SM: ₱ {item.supermarket_price}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              lineHeight: 22,
              marginTop: 10,
            }}>
            WM: ₱ {item.wetmarket_price}
          </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color:'blue',}}>Category</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {item.main_category}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
                lineHeight: 22,
                marginTop: 10,
              }}>
              As of: {item.as_of}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'column',
                //justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold',color:'blue',}}>Send Complaints</Text>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
              </View>
              <TextInput
                style={style.message}
                onChangeText={changeBody}
                value={message}
                placeholder="Complains Message!"
              />

            </View>
            <Button style ={{ marginTop: 10 }} title="Send Complains" onPress={sendComplains} />
          </View>
          <View>
          </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const style = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      flex: 0.45,
      marginTop: 20,
      //justifyContent: 'center',
      //alignItems: 'center',
    },
    detailsContainer: {
      flex: 0.55,
      backgroundColor: COLORS.light,
      marginHorizontal: 7,
      marginBottom: 7,
      borderRadius: 20,
      marginTop: 30,
      paddingTop: 30,
    },
    email: {
       height: 40,
       margin: 12,
       borderWidth: 1,
       padding: 10,
    },
    message: {
       height: 100,
       margin: 12,
       borderWidth: 1,
       padding: 10,
    },
    line: {
      width: 25,
      height: 2,
      backgroundColor: COLORS.dark,
      marginBottom: 5,
      marginRight: 3,
    },
    borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 40,
    },
    borderBtnText: {fontWeight: 'bold', fontSize: 28},
    buyBtn: {
      width: 130,
      height: 50,
      backgroundColor: COLORS.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    priceTag: {
      backgroundColor: COLORS.green,
      width: 130,
      height: 40,
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
    hyperlinkStyle: {
    color: 'blue',
  },
  });

DetailsScreen.navigationOptions = {
  headerShown: false,
};
