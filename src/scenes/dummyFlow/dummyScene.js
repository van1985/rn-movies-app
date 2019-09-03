import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import DummyComponent from '../../components/dummyComponent';

const styles = StyleSheet.create({
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
  }
}

export default dummyScene;
