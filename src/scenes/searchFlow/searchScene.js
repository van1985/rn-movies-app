import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MovieCard from '../../components/movieCard/movieCard';
import { search, addMovieToFavorite } from '../../reducers/movies/moviesActions';

import styles from './styles';

class searchScene extends Component {
  state = {
    term: '',
    typingTimeout: 0
  };

  searchTerm = term => {
    const { typingTimeout } = this.state;
    const { onSearch } = this.props;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    this.setState({
      term,
      typingTimeout: setTimeout(() => {
        onSearch(term);
      }, 1000)
    });
  };

  addToFavorite = movie => {
    this.props.onAddMovieToFavorite(movie);
  };

  buildFlatList = movies => (
    <FlatList
      keyExtractor={item => item.id}
      data={movies.searchResult.results}
      renderItem={this.renderItem}
      style={styles.flatList}
    />
  );

  renderItem = ({ item }) => <MovieCard {...item} addMovie={() => this.addToFavorite(item)} />;

  render() {
    const { movies } = this.props;
    const { term } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.searchTerm}
          value={term}
          containerStyle={styles.searchbar}
        />
        {this.buildFlatList(movies)}
      </View>
    );
  }
}

export default connect(
  state => ({ movies: state.movies }),
  {
    onSearch: search,
    onAddMovieToFavorite: addMovieToFavorite
  }
)(searchScene);
