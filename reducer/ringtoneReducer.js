import {useState} from 'react';

const initialState = 'ringtone1.mp3';

function ringtoneReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_RINGTONE':
      const payload = action.payload;

      return payload;

    default:
      return state;
  }
}

export default ringtoneReducer;
