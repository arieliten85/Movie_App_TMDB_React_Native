import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {MovieDetailsResponse} from '../interfaces/movieInterface';
import {convertMinutesToHours} from '../utils/utils';
import Colors from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {fallbackMoviePoster, generateImageURI} from '../api/movies.DB';
const {width, height} = Dimensions.get('screen');

export const MovieDetails = ({movieDetail}: IMovieDetails) => {
  return (
    <View>
      <MovieImage uri={movieDetail.poster_path} />
      <MovieGenres genres={movieDetail.genres} />
      <MovieTitle title={movieDetail.original_title} />
      <MovieInfo year={movieDetail.release_date.substring(0, 4)} adult={movieDetail.adult} runtime={movieDetail.runtime} />
      <MovieOverview overview={movieDetail.overview} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: width,
    height: height * 0.6,
    resizeMode: 'cover',
  },
  infoContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  genere: {
    fontSize: 12,
    color: Colors.grey,
    fontWeight: '800',
    padding: 5,
  },
  title: {
    color: Colors.white,
    fontSize: 40,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontWeight: '800',
  },
  year: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '800',
  },
  adult: {
    color: Colors.white,
    fontSize: 16,
    backgroundColor: Colors.primary,
    padding: 4,
    fontWeight: '500',
    borderRadius: 5,
  },
  time: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '500',
  },
  overview: {
    color: Colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 17,
    fontWeight: '400',
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
  },
});
interface IMovieDetails {
  movieDetail: MovieDetailsResponse;
}
interface IMovieInfo {
  year: string;
  adult: boolean;
  runtime: number;
}
const MovieImage = ({uri}: {uri: string}) => (
  <View style={styles.imageContainer}>
    <Image
      source={{
        uri: generateImageURI(uri) || fallbackMoviePoster,
      }}
      style={styles.image}
    />
    <LinearGradient colors={['transparent', 'rgba(23, 23, 23, 0.658)', 'rgba(23, 23, 23, 1)']} style={styles.gradient} />
  </View>
);
const MovieGenres = ({genres}: {genres: {name: string}[]}) => <Text style={styles.genere}>{genres.map(genre => genre.name).join(', ')}</Text>;
const MovieTitle = ({title}: {title: string}) => <Text style={styles.title}>{title}</Text>;
const MovieInfo = ({year, adult, runtime}: IMovieInfo) => (
  <View style={styles.infoContainer}>
    <Text style={styles.year}>{year}</Text>
    <Text style={styles.adult}>{!adult ? '+13' : '+18'}</Text>
    <Text style={styles.time}>{convertMinutesToHours(runtime)}</Text>
  </View>
);
const MovieOverview = ({overview}: {overview: string}) => (
  <View>
    <Text style={styles.overview}>{overview}</Text>
  </View>
);
