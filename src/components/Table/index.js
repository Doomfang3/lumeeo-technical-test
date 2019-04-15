import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "../Row";

import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

class Table extends Component {
  /*   componentDidMount() {
    this.getData();
  } */

  /*   getData = () => {
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
  } */

  render() {
    const { currencies } = this.props;
    const currenciesList = currencies.length ? (
      currencies.map((currency, index) => {
        return (
          <Row
            key={currency.CoinInfo.Id}
            data-index={index + 1}
            props={currency}
          />
        );
      })
    ) : (
      <h1 className="loading">Loading ...</h1>
    );
    return (
      <>
        <button onClick={this.getData} type="button">
          Refresh
        </button>
        <table>
          <thead>
            <tr className="table100-head">
              <th className="column1">#</th>
              <th className="column2">Coin</th>
              <th className="column3">Price</th>
              <th className="column4">Direct Vol. 24H</th>
              <th className="column5">Total Vol. 24H</th>
              <th className="column6">Mkt. Cap.</th>
              <th className="column7">7d Chart (USD)</th>
              <th className="column8">Chg. 24H</th>
            </tr>
          </thead>
          <tbody>{currenciesList}</tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currencies: state.currencies
  };
};

export default connect(mapStateToProps)(Table);
