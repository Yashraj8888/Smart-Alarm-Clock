export const addAlarm = (time) => {
    return {
        type: 'ADD_ALARM',
        payload: time
    }
}

export const delAlarm = (time) => {
    return {
        type: 'DELETE_ALARM',
        payload: time
    }
};
export const setRingtone = (name) => {
    return {
        type: 'ADD_RINGTONE',
        payload: name
    }
};
export const task = (name) => {
    return {
        type: 'DELETE',
        payload: name
    }
};