import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Button, Icon, Rating } from 'react-native-elements';
import Config from 'react-native-config';

import styles from './styles';

const movieCard = props => (
  <Card title={props.title}>
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.BoxContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: `${Config.POSTER_URL}${props.poster_path}` }}
          />
        </View>
        <View style={[styles.boxContainer, styles.marginLeft]}>
          <Text style={styles.title}>Release Date </Text>
          <Text style={styles.label}>{props.release_date}</Text>
          <Text style={[styles.title, styles.titleTop]}>Original Language</Text>
          <Text style={styles.label}>{props.original_language}</Text>
          <Rating
            showRating
            fractions={1}
            startingValue={props.vote_average}
            imageSize={16}
            ratingCount={8}
            readonly
          />
        </View>
      </View>
      <View style={styles.movieDescriptionContainer}>
        <Text style={styles.descriptionText}>{props.overview}</Text>
      </View>
      <View style={styles.subContainer}>
        <Button
          icon={<Icon name="star" color="white" />}
          buttonStyle={styles.button}
          title="Add to Favourites"
        />
        <Button
          icon={<Icon name="movie" color="white" />}
          buttonStyle={[styles.button, styles.marginLeft]}
          title="Watch Trailer"
        />
      </View>
    </View>
  </Card>
);

export default movieCard;
