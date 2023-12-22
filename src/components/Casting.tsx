// MovieCast.tsx

import React from 'react';
import {View, Text, FlatList, Image, Dimensions, StyleSheet} from 'react-native';
import {fallbackPersonImage, generateImagePerson} from '../api/movies.DB';
import Colors from '../constants/Colors';
import {Cast} from '../interfaces/movieInterface';

interface MovieCastProps {
  casting: Cast[];
}

const {width, height} = Dimensions.get('window');

export const Casting = ({casting}: MovieCastProps) => {
  return (
    <View>
      <Text style={styles.castTitle}>Cast</Text>

      <FlatList
        data={casting}
        renderItem={({item}) => (
          <View style={styles.containerImageCast}>
            <Image
              width={width * 0.2}
              height={height * 0.1}
              source={{
                uri: generateImagePerson(item.profile_path) || fallbackPersonImage,
              }}
              style={[styles.imageCast]}
            />

            <Text style={styles.textCast}>{item.character?.length! > 10 ? item.character?.slice(0, 10) + '...' : item?.character}</Text>

            <Text style={styles.textCast}>{item.original_name.length > 10 ? item.original_name.slice(0, 10) + '...' : item.original_name}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
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
  containerImageCast: {
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
    margin: 5,
  },
  imageCast: {
    borderColor: Colors.primary,
    borderRadius: 50,
    borderWidth: 2,
  },
  textCast: {
    paddingTop: 3,
    color: Colors.white,
  },
  castTitle: {
    color: Colors.white,
    fontSize: 20,
    padding: 7,
  },
});

export default Casting;
