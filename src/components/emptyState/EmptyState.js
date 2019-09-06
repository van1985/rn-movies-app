// @Vendors
import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

// @Styles
import styles from './styles';

// @Assets
const errorImg = require('../../assets/png/error.png');
const emptyImg = require('../../assets/png/empty.png');

const getImage = type => {
  switch (type) {
    case 'error':
      return errorImg;
    case 'empty':
      return emptyImg;
    default:
      return null;
  }
};

const EmptyState = ({ messageText, type }) => (
  <View style={styles.container}>
    {Boolean(type) && <Image source={getImage(type)} style={styles.image} />}
    <Text style={styles.errorMessage}>{messageText}</Text>
  </View>
);

EmptyState.propTypes = {
  messageText: PropTypes.string.isRequired,
  type: PropTypes.string
};

EmptyState.defaultProps = {
  type: null
};

export default EmptyState;
