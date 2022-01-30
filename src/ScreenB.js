import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacityBase,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Moment, {now} from 'moment';

function TimerView({interval, styletimer}) {
  const doubleDigitFun = n => (n < 10 ? '0' + n : n);
  const duration = Moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View>
      <Text style={styletimer}>
        {doubleDigitFun(duration.minutes())}:{doubleDigitFun(duration.seconds())}:{doubleDigitFun(centiseconds)}
      </Text>
    </View>
  );
}

function LapsTable({laps, timer}) {
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
        />
      ))}
    </ScrollView>
  );
}
function Lap({number, interval}) {
  return (
    <View style={styles.lapRow}>
      <Text style={styles.lapStyle1}>Lap {number}</Text>
      <TimerView interval={interval} styletimer={styles.lapStyle2}/>
    </View>
  );
}

const ScreenB = () => {
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState([]);
  const [vari, setVari] = useState(100);

  const timer = now - start;

  const setTimer = () => {
    setNow(new Date().getTime());
    setStart(new Date().getTime());
    var a = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);
    setLaps([0]);
    setVari(a);
  };

  const lap = () => {
    let timestamp = new Date().getTime();
    const [firstLap, ...other] = laps;
    setLaps([0, firstLap + now - start, ...other]);
    setStart(timestamp);
    setNow(timestamp);
  };
  const stop = () => {
    clearInterval(vari);
    setVari([]);
    const [firstLap, ...other] = laps;
    setLaps([firstLap + now - start, ...other]);
    setStart(0);
    setNow(0);
  };
  const reset = () => {
    setLaps([]);
    setStart(0);
    setNow(0);
  };
  const resume = () => {
    const now = new Date().getTime();
    setStart(now);
    var a = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);
    setVari(a);
  };

  return (
    <View style={styles.body}>
      <TimerView
        interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        styletimer={styles.timer}
      />
      <View style={styles.btnContainer}>
        {laps.length === 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => {
              setTimer();
            }}>
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
        )}

        {start > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => {
              lap();
            }}>
            <Text style={styles.text}>Lap</Text>
          </TouchableOpacity>
        )}
        {start > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => {
              stop();
            }}>
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        )}
        {laps.length > 0 && start === 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => {
              reset();
            }}>
            <Text style={styles.text}>Reset</Text>
          </TouchableOpacity>
        )}
        {laps.length > 0 && start === 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => {
              resume();
            }}>
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <TimerView interval={timer} styletimer={styles.timer} /> */}
      <LapsTable laps={laps} timer={timer} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor:'#131414',
    // justifyContent:'center',
    alignItems: 'center',
  },
  timer: {
    marginTop:'20%',
    color:'white',
    fontSize: 50,
    fontWeight:'600',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:6
  },
  lapStyle1:{
    fontSize:20,
    fontWeight:'400',
    color:'white'
  },
  lapStyle2:{
    fontSize:20,
    fontWeight:'400',
    color:'white'
  },
  scrollView: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
  },
  button: {
    borderColor: 'black',
    // borderWidth:1,
    backgroundColor: '#0ac6ff',
    color: 'white',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center',
    marginLeft: '40%',
    marginTop: 10,
  },
});

export default ScreenB;
