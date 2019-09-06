import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import searchScene from '../scenes/searchFlow/searchScene';
import favouritesScene from '../scenes/favoritesFlow/favoritesScene';
import trailersScene from '../scenes/trailersFlow/trailersScene';

const tabNavigator = createBottomTabNavigator(
  {
    search: {
      screen: searchScene,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: () => <Icon name="ios-search" size={24} />
      }
    },
    favourites: {
      screen: favouritesScene,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: () => <Icon name="ios-star" size={24} />
      }
    }
  },
  {
    initialRouteName: 'search',
    order: ['search', 'favourites'],
    navigationOptions: {
      header: null,
      tabBarVisible: true,
      tabBarIcon: null
    }
  }
);

const mainNavigator = createStackNavigator({
  tabNavigator,
  trailers: {
    screen: trailersScene,
    navigationOptions: {
      title: 'Trailer'
    }
  }
});

export default mainNavigator;
