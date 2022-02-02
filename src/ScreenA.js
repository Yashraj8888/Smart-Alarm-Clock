import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ListAlarm from './components/ListAlarm';
import TimePicker from './components/TimePicker';

const Tab = createBottomTabNavigator();

const ScreenA = () => {
  return (
    <View style={styles.body}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Alarm</Text>
      </View>

      <ListAlarm />
      <TimePicker />
    </View>
  );
};

export default ScreenA;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  heading: {
    fontWeight: '800',
    fontSize: 24,
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: '#131414',
  },
  dots: {
    fontSize: 24,
    color: 'white',
    fontWeight: '900',
  },
});
