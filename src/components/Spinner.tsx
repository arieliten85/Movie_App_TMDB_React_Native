import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
export const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} size={100} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignContent: 'center'},
});
