const initialState = {
  counter: 0,
  // Add more initial state properties if needed
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

export default rootReducer;
