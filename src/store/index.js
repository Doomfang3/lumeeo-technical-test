import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

import rootReducer from "../reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export function fetchArticleDetails() {
  return function(dispatch) {
    return axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        dispatch(setCurrencies({ currencies: data.Data }));
      })
      .catch(error => console.log(error));
  };
}

export default store;

/* axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(resp => (newState = { ...newState, currencies: resp.data.Data }))
      .catch(error => console.log(error)); */
