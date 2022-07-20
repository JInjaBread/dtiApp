import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('u_mail', value)
    } catch (e) {
      console.log(e)
    }
  }
  function logIn() {
    if(email != "" && password != ""){
      const data = new FormData();

      data.append('email', email)
      data.append('password', password)

      return fetch("https://dtiapp.herokuapp.com/api/login", {
        method: 'POST',
        body: data,
        header: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((json) => {
          if(json == "Validated"){
            storeData(email)
            navigation.navigate('DashboardScreen',{
              user_email: email
            })
          }else{
            alert("Log in Failed")
          }
        })
        .catch((error) => {
          alert(error)
        });
    }else{
      alert('Please Complete the Form')
    }

    }
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <Image source = {require("../assets/logo.png")} style={{ width: 100, height:100, marginBottom: 40,}}/>
      <View style={{
          backgroundColor: "#FFC0CB",
          borderRadius: 30,
          width: "80%",
          height: 50,
          marginBottom: 20,}}>
        <TextInput
          style={{
             height: 50,
             flex: 1,
             padding: 10,
             marginLeft: 20, }}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={{
          backgroundColor: "#FFC0CB",
          borderRadius: 30,
          width: "80%",
          height: 50,
          marginBottom: 20,}}>
        <TextInput
          style={{
             height: 50,
             flex: 1,
             padding: 10,
             marginLeft: 20, }}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={{
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FF1493",
      }}
      onPress={logIn}
      >
       <Text>LOGIN</Text>
     </TouchableOpacity>
      </View>
    );
}
