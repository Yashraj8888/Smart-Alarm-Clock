import alarmsReducer from "./alarmsReducer";
import ringtoneReducer from "./ringtoneReducer"

import { combineReducers } from "redux";
import { task } from "../actions/actionAlarms";
import taskReducer from "./taskReducer";

const reducers = combineReducers(
    {
    //   somename : alarmsReducer
        alarms: alarmsReducer,
        ringtone: ringtoneReducer,
        task:taskReducer
    }
);

export default reducers;