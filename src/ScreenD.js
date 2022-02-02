import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setRingtone, task} from '../actions/actionAlarms';

const ScreenD = () => {
  const del = useSelector(state => state.task);
  const ringtone = useSelector(state => state.ringtone);
  const dispatch = useDispatch();
  const [value, setValue] = useState('On');
  const [x, setX] = useState(true);

  const changeValue = () => {
    setX(!x);
    if (x == false) {
      setValue('On');
    } else {
      setValue('Off');
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.background}>
        <Text style={styles.Headingstyle}>Change ringtone for Alarm</Text>
        <TouchableOpacity
          // activeOpacity={0.7}
          style={styles.ringtonebtn}
          onPress={() => {
            dispatch(setRingtone('ringtone1.mp3'));
          }}>
          <Text style={styles.textstyle}>Audio 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ringtonebtn}
          onPress={() => {
            dispatch(setRingtone('ringtone2.mp3'));
          }}>
          <Text style={styles.textstyle}>Audio 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ringtonebtn}
          onPress={() => {
            dispatch(setRingtone('ringtone3.mp3'));
          }}>
          <Text style={styles.textstyle}>Audio 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ringtonebtn}
          onPress={() => {
            dispatch(setRingtone('ringtone4.mp3'));
          }}>
          <Text style={styles.textstyle}>Audio 4</Text>
        </TouchableOpacity>

        <Text style={styles.Headingstyle}>
          Turn on task for deleting alarms
        </Text>
        <TouchableOpacity
          style={styles.ringtonebtn}
          onPress={() => {
            dispatch(task(8));
            changeValue();
          }}>
          <Text style={styles.textstyle}>Turn {value}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#131414',
  },
  Headingstyle: {
    margin: 4,
    color: 'white',
    fontSize: 24,

    fontWeight: '800',
    borderBottomWidth: 4,
    borderColor: 'grey',
    width: '100%',
    height: 40,
  },
  textstyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  ringtonebtn: {
    justifyContent: 'center',
    backgroundColor: '#2c2f30',
    height: 40,
    margin: 1,
    padding: 4,
    // borderBottomWidth:1,
    borderColor: 'grey',
    opacity: 0.7,
  },
  special: {
    backgroundColor: 'green',
  },
});

export default ScreenD;
