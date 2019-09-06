// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, WebView } from 'react-native';
import PropTypes from 'prop-types';

// @Actions
import { getTrailerKey } from '../../reducers/movies/moviesActions';

class TrailersScene extends React.PureComponent {
  componentDidMount() {
    const { onGetTrailerKey } = this.props;
    onGetTrailerKey();
  }

  renderContent() {
    const { trailersData } = this.props;
    if (trailersData.isFetching) {
      return <ActivityIndicator />;
    }
    if (!trailersData.success) {
      return <Text>An error has ocurred while getting movie trailer</Text>;
    }
    return (
      <WebView
        source={{ uri: `https://www.youtube.com/watch?v=${trailersData.trailersKeys[0].key}` }}
      />
    );
  }

  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

TrailersScene.propTypes = {
  onGetTrailerKey: PropTypes.func.isRequired,
  trailersData: PropTypes.shape().isRequired
};

export default connect(
  state => ({
    trailersData: state.movies.trailersData
  }),
  {
    onGetTrailerKey: getTrailerKey
  }
)(TrailersScene);
