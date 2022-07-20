import React from "react";
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
  ScrollView, } from "react-native";
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from "../components/HomeScreen";
import DetailsScreen from "../components/DetailsScreen";
import PrimeScreen from "../components/PrimeScreen";
import BasicScreen from "../components/BasicScreen";
import SearchScreen from "../components/SearchScreen";

export const HomeStack = createStackNavigator({
  Home1: HomeScreen,
  Details: DetailsScreen,
  Search: SearchScreen,
});

export const PrimeStack = createStackNavigator({
  Prime: PrimeScreen,
  Details: DetailsScreen,
});
export const BasicStack = createStackNavigator({
  Basic: BasicScreen,
  Details: DetailsScreen,
});
// tab navigator

export const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeStack,
    navigationOptions: {
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="home" size={24} color="black" />
      )
      },
  },
  Basic: { screen: BasicStack,
    navigationOptions: {
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="rice" size={24} color="black" />
      )
      },
  },
  Prime: { screen: PrimeStack,
    navigationOptions: {
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="medicinebox" size={24} color="black" />
      )
      },
  },
});

// export AppContainer

export default createAppContainer(TabNavigator);
