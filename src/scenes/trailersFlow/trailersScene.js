// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, WebView } from 'react-native';
import PropTypes from 'prop-types';

// @Components
import EmptyState from '../../components/emptyState/EmptyState';

// @Styles
import styles from './styles';

// @Actions
import { getTrailerKey } from '../../reducers/movies/moviesActions';

class TrailersScene extends React.PureComponent {
  componentDidMount = () => {
    const { onGetTrailerKey } = this.props;
    onGetTrailerKey();
  };

  renderActivityIndicator = () => (
    <View style={styles.innerContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  renderEmptyState = (type, text) => (
    <View style={styles.innerContainer}>
      <EmptyState type={type} messageText={text} />
    </View>
  );

  renderContent = () => {
    const { trailersData } = this.props;
    if (trailersData.isFetching) {
      return this.renderActivityIndicator();
    }
    if (!trailersData.success) {
      return this.renderEmptyState('error', 'An error has ocurred please try again later');
    }
    if (!trailersData.trailersKeys[0] || !trailersData.trailersKeys[0].key) {
      return this.renderEmptyState('empty', 'No trailer was found');
    }
    return (
      <WebView
        renderLoading={this.renderActivityIndicator}
        source={{ uri: `https://www.youtube.com/watch?v=${trailersData.trailersKeys[0].key}` }}
        startInLoadingState
      />
    );
  };

  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

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
