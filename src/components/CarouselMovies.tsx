import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {MoviePoster} from './MoviePoster';
import {Movie} from '../interfaces/movieInterface';
import {Text} from 'react-native';
import Colors from '../constants/Colors';
interface CaroulselProps {
  movies: Movie[];
}

export const CarouselMovies = ({movies}: CaroulselProps) => {
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{marginBottom: 25}}>
      <Text style={styles.text}>Trending</Text>
      <Carousel
        data={movies}
        renderItem={({item}) => (
          <MoviePoster
            movie={item}
            height={height * 0.45}
            width={width * 0.6}
          />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        vertical={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 10,
    marginHorizontal: 10,
    fontWeight: '400',
  },
});
