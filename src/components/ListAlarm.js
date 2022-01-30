import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {delAlarm, delAlarm2} from '../../actions/actionAlarms';
import ReactNativeAN from 'react-native-alarm-notification';
import alarmsReducer from '../../reducer/alarmsReducer';
import {useSelector, useDispatch} from 'react-redux';
import TimePicker from './TimePicker';


const ListAlarm = props => {
  const alarms = useSelector(state => state.alarms.alarms);
  // {console.log(alarms)}
  const dispatch = useDispatch();
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item,index}) => {
    return (
      <View >
        <ListItem style={styles.container}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{item.time.toString()}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>{item.date.toString()}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            onPress={ e => {
              ReactNativeAN.deleteAlarm((item.alarmNotifData.id)*1);
              ReactNativeAN.stopAlarmSound();
              dispatch(delAlarm(item.value));          
              {console.log(alarms)}
            
            }}
            title="Remove"
            color="red"
          />
        </ListItem>
      </View>
    );
  };

  return (
    <>
    {/* <ScrollView> */}
    <FlatList
      keyExtractor={keyExtractor}
      data={alarms}
      renderItem={renderItem}
    />
    <TimePicker/>
    {/* </ScrollView> */}
    </>
  );
};
const styles = StyleSheet.create({
title:{
  fontSize:20,
  fontWeight:'800'
},
subtitle:{
  fontSize:20,
  
},
container:{
  marginVertical:2,
  marginHorizontal:2
}

});


export default ListAlarm;
