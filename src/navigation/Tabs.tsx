import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Navigation} from './Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import Colors from '../constants/Colors';
const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  return (
    <Tab.Navigator
      theme={theme}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <IconTab name={route.name} focused={focused} />
        ),
      })}
      activeColor={Colors.primary}
      inactiveColor={Colors.grey}
      barStyle={{
        backgroundColor: Colors.dark,
        height: 65,
        paddingBottom: 4,
      }}>
      <Tab.Screen name="Home" component={Navigation} />
    </Tab.Navigator>
  );
};

interface IconTabProps {
  name: string;
  focused: boolean;
}

const IconTab = ({name, focused}: IconTabProps) => {
  let iconName: string = '';
  switch (name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;

    case 'My favorites':
      iconName = focused ? 'person' : 'person-outline';
      break;
  }

  return (
    <Icon name={iconName} size={20} color={focused ? Colors.primary : 'grey'} />
  );
};
