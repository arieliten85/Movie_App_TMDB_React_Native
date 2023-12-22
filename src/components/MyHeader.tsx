import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import {RootStackParamas} from '../navigation/Navigation';

export const MyHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamas, 'SearchScreen'>>();
  return (
    <Animated.View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Feather name="menu" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        <Text style={{color: Colors.primary, fontWeight: '800'}}>N</Text>etmovix
      </Text>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Feather name="search" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: Colors.dark,
    padding: 10,
  },

  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '500',
    marginHorizontal: 10,
  },
});
