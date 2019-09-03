import { SwitchNavigator } from 'react-navigation';
import dummyFlow from '../scenes/dummyFlow/navigator';

/**
 * Main Stack Navigation. Used to display the app header
 */
export default SwitchNavigator(
  {
    dummy: {
      screen: dummyFlow
    }
  },
  {
    initialRouteName: 'dummy',
    headerMode: 'none'
  }
);
