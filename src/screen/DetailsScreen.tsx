import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {RootStackParamas} from '../navigation/Navigation';
import {ScrollView} from 'react-native-gesture-handler';

import {Spinner} from '../components/Spinner';
import {MovieDetails} from '../components/MovieDetails';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {FlatListMovie} from '../components/FlatListMovie';

import {Cast, IMovieSimilar, MovieDetailsResponse} from '../interfaces/movieInterface';
import Casting from '../components/Casting';
import {useMovieDB} from '../api/movies.DB';

interface Props extends StackScreenProps<RootStackParamas, 'DetailsScreen'> {}

export const DetailsScreen = ({route, navigation}: Props) => {
  const movieSelect = route.params;
  const {width, height} = Dimensions.get('window');
  const {getMovieDetails, getMovieSimilar, getMovieCredits} = useMovieDB();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsResponse>();
  const [movieSimilar, setMovieSimilar] = useState<IMovieSimilar[]>();
  const [movieCredits, setMovieCredits] = useState<Cast[]>();
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(true);
  const [isFavorites, setIsFavorites] = useState<boolean>(false);
  const toggleFavourite = () => setIsFavorites(!isFavorites);

  useEffect(() => {
    const fetchDetailsResults = async () => {
      try {
        const resp = await getMovieDetails(movieSelect.id);
        setMovieDetails(resp);
        setIsLoadingDetails(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    const fetchSimilarResults = async () => {
      try {
        const resp = await getMovieSimilar(movieSelect.id);
        setMovieSimilar(resp?.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    const fetchCredistsResults = async () => {
      try {
        const resp = await getMovieCredits(movieSelect.id);
        setMovieCredits(resp);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchDetailsResults();
    fetchSimilarResults();
    fetchCredistsResults();
  }, [movieSelect]);

  if (isLoadingDetails) {
    return <Spinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.favorites} onPress={toggleFavourite}>
        <Icon color={isFavorites ? 'red' : '#e2dede'} name={isFavorites ? 'heart' : 'heart'} size={40} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon style={styles.backButton} color="white" name="chevron-back-outline" size={40} />
      </TouchableOpacity>

      {movieDetails && <MovieDetails movieDetail={movieDetails!} />}
      {movieCredits && <Casting casting={movieCredits!} />}

      <FlatListMovie title="Similar" movies={movieSimilar!} width={width * 0.33} height={height * 0.22} horizontal hideSeeAll={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 15,
    left: 15,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  favorites: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 22,
    right: 15,
    padding: 5,
  },
});
