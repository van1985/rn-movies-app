import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

class favoritesScene extends Component {
  componentDidMount() {
    this.props.onSearch('avenger');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Favorites Scene</Text>
      </View>
    );
  }
}

export default favoritesScene;
