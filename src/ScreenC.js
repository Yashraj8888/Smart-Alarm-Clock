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

import BackgroundTimer from 'react-native-background-timer';

const ScreenC = () => {
  const [hoursIn, SetHoursIn] = useState(null);
  const [minsIn, SetMinsIn] = useState(null);
  const [secsIn, SetSecsIn] = useState(null);
  const [timerState, setTimerState] = useState(false);

  var totalsecs;

  useEffect(() => {
    if (timerState) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [timerState]);

  const [secondsLeftState, setSecondsLeftState] = useState(null);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeftState(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  const setTime = () => {
    let hours = Math.floor(secondsLeftState / 60 / 60);
    let mins = Math.floor((secondsLeftState / 60) % 60);
    let seconds = Math.floor(secondsLeftState % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <View style={styles.body}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{setTime().displayHours} Hours</Text>
        <Text style={styles.timer}>{setTime().displayMins} Mins </Text>
        <Text style={styles.timer}>{setTime().displaySecs} Secs</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSecondsLeftState(hoursIn * 60 * 60 + minsIn * 60 + secsIn * 1);
          }}>
          <Text style={styles.text}>Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSecondsLeftState(0);
          }}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={hoursIn}
          placeholder="Enter Hours"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          onChangeText={v => {
            SetHoursIn(v);
          }}
        />
        <TextInput
          style={styles.input}
          value={minsIn}
          placeholder="Enter Mins"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          onChangeText={v => {
            SetMinsIn(v);
          }}
        />
        <TextInput
          style={styles.input}
          value={secsIn}
          placeholder="Enter Secs"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          onChangeText={v => {
            SetSecsIn(v);
          }}
        />

        {console.log(secondsLeftState)}
      </View>
      <TouchableOpacity
        style={styles.btn2}
        title="start/stop"
        onPress={() => {
          setTimerState(timerState => !timerState);
        }}>
        <Text style={styles.text}>Start / Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#131414',
  },
  input: {
    backgroundColor: '#c5cbd4',
    width: 100,
    margin: 10,
    borderRadius: 10,
  },
  timerContainer: {
    // margin: 20,
    marginTop: '30%',
    alignSelf: 'center',
  },
  timer: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    borderColor: 'black',
    // borderWidth:1,
    backgroundColor: '#0ac6ff',
    color: 'white',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    borderColor: 'black',
    // borderWidth:1,
    backgroundColor: '#0ac6ff',
    color: 'white',
    height: 80,
    width: 160,
    marginTop:20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 100,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
  },

});

export default ScreenC;
