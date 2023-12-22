import React from 'react';
import {MoviePoster} from './MoviePoster';
import {IMovieSimilar, Movie} from '../interfaces/movieInterface';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
interface FlatListMovieProps {
  movies: Movie[] | IMovieSimilar[];
  width: number;
  height: number;
  title?: string;
  horizontal: boolean;
  hideSeeAll?: boolean;
}

export const FlatListMovie = ({
  title,
  movies,
  horizontal,
  height,
  width,
  hideSeeAll,
}: FlatListMovieProps) => {
  return (
    <View style={{marginVertical: 5}}>
      <View style={styles.container}>
        <Text style={!hideSeeAll ? styles.text : styles.similar_text}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.see}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} height={height} width={width} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 5,
    marginHorizontal: 10,
    fontWeight: '400',
  },

  see: {
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 10,
    marginHorizontal: 10,
    fontWeight: '400',
  },
  similar_text: {
    color: Colors.white,
    width: '100%',

    fontSize: 20,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
});
