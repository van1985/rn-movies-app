import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import Config from 'react-native-config';

import styles from './styles';

const favoriteCard = props => (
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Avatar
        rounded
        size="large"
        source={{
          uri: `${Config.POSTER_URL}${props.poster_path}`
        }}
      />
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button
        icon={<Icon name="delete" color="white" />}
        buttonStyle={styles.button}
        title="Remove"
        onPress={props.removeMovie}
      />
    </View>
  </View>
);

export default favoriteCard;
