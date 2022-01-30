import React, {useState} from 'react';
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
import {Modal} from 'react-native-paper';

import {white} from 'react-native-paper/lib/typescript/styles/colors';
import {TouchableOpacity} from 'react-native';

const TimePicker = props => {
  const alarms = useSelector(state => state.alarms);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [music, setMusic] = useState('ringtone1.mp3');

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

    const alarmNotifData = {
      id: makeid(),
      title: 'Alarm Ringing',
      message: 'My Notification Message',
      channel: 'alarm-channel',
      ticker: 'My Notification Ticker',
      auto_cancel: true,
      vibrate: true,
      vibration: 100,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      loop_sound: true,
      sound_name: music,
      color: 'red',
      schedule_once: true,
      tag: 'some_tag',
      fire_date: fireDate,

      data: {value: datetime},
    };

    ReactNativeAN.scheduleAlarm(alarmNotifData);
    dispatch(addAlarm(alarmNotifData));
    hideDateTimePicker();
  };

  makeid = () => {
    var length = 5;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              showDateTimePicker();
            }}
            title="+ Add Alarm"
            activeOpacity={0.7}
            style={styles.add}>
            <Text style={styles.textStyle}>Add Alarm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.ringtoneBtn}>
            <Text style={styles.dots}>⋮</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        mode="datetime"
        // value={new Date()}
        isVisible={isVisibleState}
        onConfirm={handleDateTimePicker}
        onCancel={hideDateTimePicker}
      />

      <SafeAreaView style={styles.uniContainer}>
        <Modal
          animationType="slide"
          //   transparent={true}
          visible={modalVisible}
          style={styles.centeredView}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.background}>
            <Text style={styles.textstyle}>Choose an audio !</Text>
            <TouchableOpacity
              onPress={() => {
                setMusic('ringtone1.mp3');
              }}>
              <Text style={styles.textstyle}>Audio 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMusic('ringtone2.mp3');
              }}>
              <Text style={styles.textstyle}>Audio 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMusic('ringtone3.mp3');
              }}>
              <Text style={styles.textstyle}>Audio 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMusic('ringtone4.mp3');
              }}>
              <Text style={styles.textstyle}>Audio 4</Text>
            </TouchableOpacity>

            <Button
              title="hide"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // paddingBottom:200
  },
  add: {
    backgroundColor: '#0ac6ff',
    height: 60,
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
    zIndex: 1,

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
