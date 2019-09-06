import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import searchScene from '../scenes/searchFlow/searchScene';
import favoritesScene from '../scenes/favoritesFlow/favoritesScene';

const AppNavigator = createBottomTabNavigator(
  {
    search: {
      screen: searchScene,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: () => <Icon name="ios-search" size={24} />
      }
    },
    favorites: {
      screen: favoritesScene,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: () => <Icon name="ios-star" size={24} />
      }
    }
  },
  {
    initialRouteName: 'search',
    order: ['search', 'favorites'],
    navigationOptions: {
      tabBarVisible: true,
      tabBarIcon: null
    }
  }
);

export default AppNavigator;
