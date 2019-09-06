import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MovieCard from '../../components/movieCard/movieCard';
import { search } from '../../reducers/movies/moviesActions';

import styles from './styles';

class searchScene extends Component {
  state = {
    term: '',
    typingTimeout: 0
  };

  componentDidMount = () => {
    this.props.onSearch('The ');
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

  renderItem = ({ item }) => <MovieCard {...item} />;

  render() {
    const { searchResult } = this.props;
    const { term } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.searchTerm}
          value={term}
          containerStyle={styles.searchbar}
        />
        <FlatList
          keyExtractor={item => item.id}
          data={searchResult.searchResult.results}
          renderItem={this.renderItem}
          style={styles.flatList}
        />
      </View>
    );
  }
}

export default connect(
  state => ({ searchResult: state.search }),
  {
    onSearch: search
  }
)(searchScene);
