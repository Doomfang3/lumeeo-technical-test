import React, { Component } from "react";

class Row extends Component {
  state = {};
  render() {
    const currency = this.props.props;
    return (
      <tr>
        <td className="column1">{this.props["data-index"]}</td>
        <td className="column2">
            <img
              src={`https://www.cryptocompare.com${
                currency.DISPLAY.USD.IMAGEURL
              }`}
              alt={`${currency.CoinInfo.FullName} logo`}
            />
            <div className="displayName"><div>{currency.CoinInfo.FullName}</div><div>{currency.CoinInfo.Name}</div></div>
        </td>
        <td className="column3">{currency.DISPLAY.USD.PRICE}</td>
        <td className="column4">{currency.DISPLAY.USD.VOLUME24HOURTO}</td>
        <td className="column5">{currency.DISPLAY.USD.VOLUME24HOUR}</td>
        <td className="column6">{currency.DISPLAY.USD.MKTCAP}</td>
        <td className="column7">
          <img
            src={`https://www.cryptocompare.com${
              currency.DISPLAY.USD.IMAGEURL
            }`}
            alt={`${currency.CoinInfo.FullName} logo`}
          />
        </td>
        <td className="column8">{currency.DISPLAY.USD.CHANGEPCT24HOUR}%</td>
      </tr>
    );
  }
}

export default Row;
