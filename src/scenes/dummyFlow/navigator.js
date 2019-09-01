import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import dummyScene from './dummyScene';

export default TabNavigator(
  {
    dummy: {
      screen: dummyScene,
      navigationOptions: {
        swipeEnabled: true,
        title: 'Dummy Scene',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: '#B2CE38',
        paddingBottom: Platform.OS === 'ios' ? 15 : 0,
      },
    },
  },
);