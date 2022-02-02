import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  // Modal,
  FlatList,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {delAlarm, delAlarm2, task} from '../../actions/actionAlarms';
import ReactNativeAN from 'react-native-alarm-notification';
import alarmsReducer from '../../reducer/alarmsReducer';
import {useSelector, useDispatch} from 'react-redux';
import TimePicker from './TimePicker';
import {FAB} from 'react-native-elements';
import {TextInput} from 'react-native-paper';

const ListAlarm = props => {
  var alarms = useSelector(state => state.alarms.alarms);
  const [answer, setAnswer] = useState(0);
  let [inputAnswer, setInputAnswer] = useState(1);
  const [nee, setnee] = useState();

  const [isVisible, setIsVisibleState] = useState(false);
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);

  var del = useSelector(state => state.task);

  const dispatch = useDispatch();
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item, index}) => {
    if (del == true) {
      return (
        <View>
          <ListItem style={styles.container}>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.time.toString()}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.date.toString()}
              </ListItem.Subtitle>
            </ListItem.Content>

            <Button
              title="task"
              onPress={() => {
                setIsVisibleState(true);
                const x = Math.floor(Math.random() * 1000 + 1);
                const y = Math.floor(Math.random() * 1000 + 1);
                setAnswer(x + y);
                setX(x);
                setY(y);
              }}
            />
            <Button
              onPress={() => {
                // console.log(del)

                // const deleteFun=()=> {
                console.log(inputAnswer);
                if (inputAnswer == answer) {
                  ReactNativeAN.deleteAlarm(item.alarmNotifData.id);
                  ReactNativeAN.stopAlarmSound();
                  dispatch(delAlarm(item.value));
                  {
                    // console.log(alarms);
                  }
                } else {
                  Alert.alert('not correct');
                }
                setInputAnswer(null);
              }}
              title="Remove"
              color="red"
            />
          </ListItem>
        </View>
      );
    } else {
      return (
        <View>
          <ListItem style={styles.container}>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.time.toString()}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.date.toString()}
              </ListItem.Subtitle>
            </ListItem.Content>

            <Button
              onPress={() => {
                ReactNativeAN.deleteAlarm(item.alarmNotifData.id);
                ReactNativeAN.stopAlarmSound();
                dispatch(delAlarm(item.value));
              }}
              title="Remove"
              color="red"
            />
          </ListItem>
        </View>
      );
    }
  };

  return (
    <>
   
      <View>
        <Modal isVisible={isVisible}>
          <View style={styles.modalStyle}>
            <Text style={styles.txt1}>Answer to turn off alarm !</Text>
            <Text style={styles.txt2}>
              {X}+{Y}=?
            </Text>
            <TextInput
              placeholder="Enter answer here"
              // value={inputAnswer}
              style={styles.inputStyle}
              onChangeText={v => {
                setInputAnswer(v);
              }}
            />
            <Button
              title="submit"
              style={styles.submitbtn}
              onPress={() => {
                setIsVisibleState(false);
                
              }}
            />
          </View>
          <Button
            title="Hide"
            style={styles.btn}
            onPress={() => {
              setIsVisibleState(false);
              setInputAnswer(null);
            }}
          />
        </Modal>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={alarms}
        renderItem={renderItem}
      />
      {/* </ScrollView> */}
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 20,
  },
  container: {
    marginVertical: 3,
    marginHorizontal: 2,
  },
  input: {
    backgroundColor: 'grey',
    position: 'relative',
    // left:500,
  },
  modal: {
    backgroundColor: 'white',
    height: 2000,
  },
  con: {
    height: 1000,
  },
  modalStyle: {
    flex: 1,
    backgroundColor: 'black',
  },
  txt1: {
    marginTop: 20,
    color: 'white',
    fontSize: 30,
    padding: 5,
  },
  txt2: {
    marginTop: 50,
    color: 'white',
    fontSize: 30,
    padding: 5,
  },
  btn: {
    width: 10,
  },
  inputStyle: {
    width: '100%',
  },
});

export default ListAlarm;
