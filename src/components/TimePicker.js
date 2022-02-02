import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

import {addAlarm} from '../../actions/actionAlarms';
import ReactNativeAN from 'react-native-alarm-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';
// import { FAB } from 'react-native-elements';
import {Modal} from 'react-native-paper';
import ListAlarm from './ListAlarm';

import {white} from 'react-native-paper/lib/typescript/styles/colors';
import {TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-elements';

const TimePicker = props => {
  const alarms = useSelector(state => state.alarms.alarms);
  const ringtone = useSelector(state => state.ringtone);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [music, setMusic] = useState('ringtone1.mp3');
  const [yash, setyash] = useState(0);

  const [isVisibleState, setIsVisibleState] = useState(false);

  const showDateTimePicker = () => {
    setIsVisibleState(true);
  };

  const hideDateTimePicker = () => {
    setIsVisibleState(false);
  };

  const handleDateTimePicker = datetime => {
    var currentTime = Date.now();
    if (datetime.getTime() < currentTime) {
      Alert.alert(
        'Past Date and Time are chosen. Please choose another input.',
      );
      hideDateTimePicker();
      return;
    }
    const fireDate = ReactNativeAN.parseDate(datetime);
    console.log('A date has been picked: ', fireDate);

    let alarmNotifData = {
      title: 'Alarm Ringing',
      message: 'My Notification Message',
      channel: 'alarm-channel',
      ticker: 'My Notification Ticker',
      auto_cancel: false,
      vibrate: true,
      vibration: 100,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      loop_sound: true,
      sound_name: ringtone,
      color: 'red',
      schedule_once: true,
      tag: 'some_tag',
      fire_date: fireDate,
      bypass_dnd:true,

      data: {value: datetime,
             number1: Math.floor((Math.random() * 1000) + 1),
             number2: Math.floor((Math.random() * 1000) + 1)
      
      },
    };

    async function method() {
      const alarm = await ReactNativeAN.scheduleAlarm(alarmNotifData);
      alarmNotifData.id = alarm.id;
      // console.log('hi');
      // console.log(alarm.id);
      console.log(alarmNotifData);
      return alarm;
    }
    method();

    dispatch(addAlarm(alarmNotifData));
    hideDateTimePicker();
  };

  return (
    <View style={styles.universalContainer}>
      <ScrollView>
        <View style={styles.container}>
          <FAB
            style={styles.add}
            color="#0ac6ff"
            icon={{name: 'add', color: 'white'}}
            onPress={() => {
              showDateTimePicker();
            }}
          />

          
        </View>
      </ScrollView>
      
      <DateTimePickerModal
        mode="datetime"
        // value={new Date()}
        isVisible={isVisibleState}
        onConfirm={handleDateTimePicker}
        onCancel={hideDateTimePicker}
      />

      
      
    </View>
  );
};
const styles = StyleSheet.create({
  
  container: {
    height: 80,
    backfaceVisibility: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    backgroundColor: 'transparent',
    // paddingBottom:200
  },
  add: {
    // resizeMode:'contain',
    // marginHorizontal:5,
    // backgroundColor: '#0ac6ff',
    height: 40,
    width: 140,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ringtoneBtn: {
    backgroundColor: '#0ac6ff',
    height: 50,
    width: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
  },
  dots: {
    fontSize: 24,
    color: 'white',
    fontWeight: '900',
  },
  centeredView: {
    height: 190,

    borderRadius: 20,
    backgroundColor: '#2c2f30',
    zIndex: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  uniContainer: {
    backgroundColor: 'pink',
  },
  textstyle: {
    // backgroundColor:'white',
    color: 'white',
    // borderBottomWidth:1,
    marginBottom: 6,
    alignSelf: 'center',
    // width:200,
    fontSize: 16,
    alignItems: 'center',
  },
});

export default TimePicker;
