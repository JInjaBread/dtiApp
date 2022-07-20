import React, { useState, useEffect, useCallback } from "react";
import TabNavigator from "../navigator/TabNavigator";
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
export default function DasboardScreen({route ,navigation}){
  const email = route.params;
  return(
    <View
      style={{
        flex: 1,
        // borderWidth: 4,
        // borderColor: "red",
        marginTop: 30,
        flexDirection: "column",
      }}
    >
    <TabNavigator email={email}/>
    </View>
  );
}
