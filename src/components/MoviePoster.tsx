import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Movie, IMovieSimilar} from '../interfaces/movieInterface';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {fallbackMoviePoster, generateImageURI} from '../api/movies.DB';

type MovieType = Movie | IMovieSimilar;
interface Props {
  movie: MovieType;
  height: number;
  width: number;
}

export const MoviePoster = ({movie, height, width}: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', movie)}
      style={{
        width: width,
        height: height,
        margin: 7,
      }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: generateImageURI(movie.poster_path) || fallbackMoviePoster,
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
});
