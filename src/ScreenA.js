import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListAlarm from './components/ListAlarm';
import TimePicker from './components/TimePicker';
import { SafeAreaView } from 'react-native-safe-area-context';



const Tab = createBottomTabNavigator();

 const ScreenA = () => {

  return (
    <View style={styles.body}>
      <View style={styles.headerContainer}>
      <Text style={styles.heading}>
        Alarm  
      </Text>
      {/* <Ringtone /> */}
      {/* <Pressable onPress={()=>{setModalVisble(true)}}>
      <Text style={styles.dots}>⋮</Text>
      </Pressable> */}
      </View>
      
      <SafeAreaView>
        <ListAlarm/>
        
      </SafeAreaView>
      {/* <TimePicker/> */}
    </View>
  )
}

export default ScreenA;

const styles = StyleSheet.create({
    headerContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:10
    },
    heading:{
      fontWeight:'800',
      fontSize:24,
      color: 'white'
    },
    body:{
      flex:1,
      backgroundColor:'#131414'
    },
    dots:{
      fontSize:24,
      color:'white',
      fontWeight:'900'
    }
  })