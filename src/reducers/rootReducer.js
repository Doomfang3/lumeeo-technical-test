const initState = {
  currencies: []
};

const rootReducer = (state = initState, action) => {
  console.log(action);
  if (action.type === "GET_DATA") {
  }
  return state;
};

export default rootReducer;
