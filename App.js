

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenA from './src/ScreenA';
import ScreenB from './src/ScreenB';
import ScreenC from './src/ScreenC';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

function App() {
  useEffect(()=>{SplashScreen.hide()},[])
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Alarm') {
              iconName = 'clock';
            
              // size = focused ? 25 : 20;
              size = 20
              // color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Stopwatch') {
              iconName = 'stopwatch';
              // size = focused ? 25 : 20;
              size = 20
              // color = focused ? '#f0f' : '#555';
            }
             else if (route.name === 'Timer') {
              iconName = 'hourglass-half';
              // size = focused ? 25 : 20;
              size = 20
              // color = focused ? '#f0f' : '#555';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
      
        // tabBarOptions={{
        //   activeTintColor: '#f0f',
        //   inactiveTintColor: '#555',
        //   activeBackgroundColor: '#fff',
        //   inactiveBackgroundColor: '#999',
        //   showLabel: false,
        //   labelStyle: { fontSize: 14 },
        //   showIcon: true,
        // }}
        
        activeColor='#84defa'
        activeBackgroundColor='#f0edf6'
        inactiveColor='#f0edf6'
        barStyle={{ backgroundColor: '#2c2f30' }}
        labeled= 'false'
        active
      >
        <Tab.Screen
          name="Alarm"
          component={ScreenA}
        />
        <Tab.Screen
          name="Stopwatch"
          component={ScreenB}
        />
        <Tab.Screen
          name="Timer"
          component={ScreenC}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
 

});

export default App;