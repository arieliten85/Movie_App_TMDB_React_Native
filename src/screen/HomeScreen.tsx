import React from 'react';
import {ScrollView, View, StatusBar, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatListMovie} from '../components/FlatListMovie';
import {CarouselMovies, Spinner} from '../components/indexComponent';
import {MyHeader} from '../components/MyHeader';
import Colors from '../constants/Colors';
import {useMovieDB} from '../api/movies.DB';
const {width, height} = Dimensions.get('window');
export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {trending, popular, upcoming, topRated, isLoading} = useMovieDB();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={{backgroundColor: Colors.primaryDark}}>
      <StatusBar hidden />
      <MyHeader />
      <View style={{marginTop: top + 20}}>
        <CarouselMovies movies={trending!} />
        <FlatListMovie title="Popular" movies={popular} horizontal={true} height={height * 0.22} width={width * 0.33} />
        <FlatListMovie title="Upcoming" movies={upcoming} horizontal={true} height={height * 0.22} width={width * 0.33} />
        <FlatListMovie title="Top rated" movies={topRated} horizontal={true} height={height * 0.22} width={width * 0.33} />
      </View>
    </ScrollView>
  );
};
