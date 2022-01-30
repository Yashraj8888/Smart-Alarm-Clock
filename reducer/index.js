import alarmsReducer from "./alarmsReducer";

import { combineReducers } from "redux";

const reducers = combineReducers(
    {
    //   somename : alarmsReducer
        alarms: alarmsReducer
    }
);

export default reducers;