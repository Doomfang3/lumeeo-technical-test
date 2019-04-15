import React, { Component } from "react";
import axios from "axios";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
    .get(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
    )
    .then(resp => {
      this.setState({
        currencies: resp.data.Data
      });
      console.log(this.state.currencies);
    })
    .catch(error => console.log(error));
  }

  render() {
    const { currencies } = this.state;
    const currenciesList = currencies.length ? (
      currencies.map(currency => {
        return (
          <div key={currency.CoinInfo.Id}>
            <h2>{currency.CoinInfo.FullName}</h2>
            <h3>Price: {currency.DISPLAY.USD.PRICE}</h3>
            <h4>Last Transaction ID: {currency.DISPLAY.USD.LASTTRADEID}</h4>
          </div>
        )
      })
    ) : (
    <h1>Loading ...</h1>
    );
    return (
      <>
      <button onClick={this.getData} type="button">Refresh</button>
        {currenciesList}
      </>
    );
  }
}

export default Table;
