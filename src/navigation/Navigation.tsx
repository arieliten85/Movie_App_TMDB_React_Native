import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen} from '../screen/HomeScreen';
import {DetailsScreen} from '../screen/DetailsScreen';
import {Movie, IMovieSimilar} from '../interfaces/movieInterface';
import {SearchScreen} from '../screen/SearchScreen';

export type RootStackParamas = {
  HomeScreen: undefined;
  DetailsScreen: Movie | IMovieSimilar;
  SearchScreen: undefined;
};

export const Navigation = () => {
  const Stack = createStackNavigator<RootStackParamas>();

  return (
    <>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </>
  );
};
