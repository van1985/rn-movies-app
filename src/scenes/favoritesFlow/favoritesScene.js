import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import FavoriteCard from '../../components/favoriteCard/favoriteCard';
import { deleteMovieFromFavorite } from '../../reducers/movies/moviesActions';

import styles from './styles';

class favoritesScene extends Component {
  removeFromFavorite = movieId => {
    this.props.onDeleteMovieFromFavorite(movieId);
  };

  renderItem = ({ item }) => (
    <FavoriteCard {...item} removeMovie={() => this.removeFromFavorite(item.id)} />
  );

  render() {
    const { movies } = this.props;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Favorites',
            style: { color: '#fff', textAlign: 'center', textAlignVertical: 'center' }
          }}
          backgroundColor="#313337"
        />
        <FlatList
          keyExtractor={item => item.id}
          data={movies.favorites}
          renderItem={this.renderItem}
          style={styles.flatList}
        />
      </View>
    );
  }
}

export default connect(
  state => ({ movies: state.movies }),
  {
    onDeleteMovieFromFavorite: deleteMovieFromFavorite
  }
)(favoritesScene);
