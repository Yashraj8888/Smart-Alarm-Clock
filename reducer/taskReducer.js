const initialState = false;

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE':
      const valu = !state;
      return valu;

    default:
      return state;
  }
}

export default taskReducer;
