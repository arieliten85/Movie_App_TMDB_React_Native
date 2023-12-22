import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity, FlatList, Image, Dimensions} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Movie} from '../interfaces/movieInterface';
import {MoviePoster} from '../components/MoviePoster';
import {Spinner} from '../components/Spinner';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {useMovieDB} from '../api/movies.DB';

const {width, height} = Dimensions.get('window');

export const SearchScreen = () => {
  const {searchMovie} = useMovieDB();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [resultMovies, setResultMovies] = useState<Movie[]>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSearch = (value: string) => {
    if (value) {
      setQuery(value);
    } else {
      setQuery('');
      setResultMovies([]);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query && query.length > 2) {
        setIsLoading(true);
        try {
          const resp = await searchMovie(query);
          setResultMovies(resp?.data.results);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={handleSearch}
          value={query}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.textInput}
        />
        {query ? (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              setResultMovies([]);
            }}
            style={styles.iconContainer}>
            <Icon name="close" size={35} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={styles.iconContainer}>
            <Icon name="return-down-back-outline" size={35} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.containerResults}>
        {isLoading ? (
          <Spinner />
        ) : (
          (resultMovies && resultMovies.length > 0 && <MoviesResultView resultMovies={resultMovies} />) || (
            <EmptyResultsView />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 50,
    padding: 7,
    margin: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.white,
  },
  iconContainer: {
    backgroundColor: Colors.grey,
    borderRadius: 50,
    padding: 7,
  },

  containerResults: {
    flex: 1,
  },

  image: {
    flex: 1,
    width: 120,
    height: 200,
    borderRadius: 10,
  },
});

const EmptyResultsView = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Image source={require('../assets/movieTime.png')} style={{height: height * 0.5, width: width}} />
    </View>
  );
};

interface MoviesResultViewProps {
  resultMovies?: Movie[];
}

const MoviesResultView = ({resultMovies}: MoviesResultViewProps) => {
  return (
    <FlatList
      data={resultMovies}
      renderItem={({item}) => <MoviePoster movie={item} height={height * 0.3} width={width * 0.44} />}
      keyExtractor={item => item.id.toString()}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
    />
  );
};
