import React, { Component } from 'react';
import DummyComponent from '../../components/dummyComponent';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


const styles= StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

class dummyScene extends Component {
  static navigationOptions = {
    title: 'DummyScene',
  }

  render() {
      return (
        <View style={styles.wrapper}>
            <DummyComponent />
        </View>
    );
};
}

export default dummyScene;