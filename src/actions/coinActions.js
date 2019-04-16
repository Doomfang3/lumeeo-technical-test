import { FETCH_COINS } from "./types";

export const fetchCoins = () => dispatch => {
  fetch(
    "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
  )
    .then(res => res.json())
    .then(coins => {
      dispatch({
        type: FETCH_COINS,
        payload: coins.Data
      });
    })
    .catch(error => console.log(error));
};

export const fetchAllCoins = () => dispatch => {
  fetch(
    "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
  )
    .then(res => res.json())
    .then(coins => {
      dispatch({
        type: FETCH_COINS,
        payload: coins.Data
      });
    })
    .catch(error => console.log(error));
};
