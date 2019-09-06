// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import debounce from 'lodash/debounce';

// @Components
import EmptyState from '../../components/emptyState/EmptyState';
import MovieCard from '../../components/movieCard/movieCard';

// @Actions
import { search, addMovieToFavorite, selectMovie } from '../../reducers/movies/moviesActions';

import styles from './styles';

class searchScene extends React.PureComponent {
  constructor(props) {
    super();
    this.state = { term: '' };
    this.performSearch = debounce(props.onSearch, 1500, { leading: false, trailing: true });
  }

  handleWatchTrailer = id => {
    const { navigation, onSelectMovie } = this.props;
    onSelectMovie(id);
    navigation.navigate('trailers');
  };

  searchTerm = nextTerm => {
    const { term } = this.state;

    if (nextTerm === term) {
      return;
    }

    this.setState({ term: nextTerm });
    this.performSearch(nextTerm);
  };

  addToFavorite = movie => {
    this.props.onAddMovieToFavorite(movie);
  };

  buildFlatList = movies => (
    <FlatList
      extraData={movies.favorites}
      keyExtractor={item => `${item.id}`}
      data={movies.searchResult.results}
      renderItem={this.renderItem}
      style={styles.flatList}
    />
  );

  checkFavourite = (currentId, favourites) =>
    Boolean(favourites.find(movie => movie.id === currentId));

  renderItem = ({ item }) => {
    const { movies } = this.props;
    const isFavorite = this.checkFavourite(item.id, movies.favorites);
    return (
      <MovieCard
        {...item}
        addMovie={() => this.addToFavorite(item)}
        favorite={isFavorite}
        onWatchTrailer={() => this.handleWatchTrailer(item.id)}
      />
    );
  };

  renderEmptyState = (type, text) => (
    <View style={styles.innerContainer}>
      <EmptyState type={type} messageText={text} />
    </View>
  );

  renderContent = () => {
    const { movies } = this.props;
    if (movies.isFetching) {
      return (
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (!movies.firstSearchPerformed) {
      return this.renderEmptyState(null, 'Please search for some movies');
    }
    if (!movies.success) {
      return this.renderEmptyState('error', 'An error has ocurred please try again later');
    }
    if (!movies.searchResult.results.length) {
      return this.renderEmptyState('empty', 'No results found for the current search');
    }
    return this.buildFlatList(movies);
  };

  render() {
    const { term } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          autoCorrect={false}
          placeholder="Type Here..."
          onChangeText={this.searchTerm}
          value={term}
          containerStyle={styles.searchbar}
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default connect(
  state => ({ movies: state.movies }),
  {
    onSearch: search,
    onAddMovieToFavorite: addMovieToFavorite,
    onSelectMovie: selectMovie
  }
)(searchScene);
