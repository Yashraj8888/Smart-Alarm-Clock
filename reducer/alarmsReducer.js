import Moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';


const initialState = {
  alarms: [],
};

function alarmsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ALARM':
      Moment.locale('en');
      console.log('time', state);
      const payload = action.payload;
      const time = Moment(payload.data.value).format('hh:mm A');
      const date = Moment(payload.data.value).format('DD-MM-YYYY');
      console.log(time);
      const alarm = {
        alarmNotifData: payload,
        value: payload.data.value,
        date: date,
        time: time,
      };
      return {
        ...state,
        alarms: state.alarms.concat(alarm),
      };
    case 'DELETE_ALARM':
      // state.alarms.splice(alarmNotifData,1)
      //  delete state.alarmNo
      
      return {
        ...state,
        alarms: state.alarms.filter(v => {
          return v.value !== action.payload;
        }),
      };
    // case 'ADD_RINGTONE':
    //   state.alarms.alarmNotifData.sound_name=action.payload
    //   //  delete state.alarmNo

      // return {
      //   alarm
      // };
  

    default:
      return state;
  }
}

export default alarmsReducer;
