import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Table, Button } from "antd";

import { getData } from "../../actions/dataActions";

class App extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.props.getData();
  }

  start = () => {
    this.props.getData();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };

  render() {
    console.log(this.props)
    const { currencies } = this.props;
    const { loading } = this.state;

    const data = [];
    currencies.forEach((currency, index) => {
      data.push({
        key: currency.CoinInfo.Id,
        index: index + 1,
        coin: currency.CoinInfo.FullName + " " + currency.CoinInfo.Name,
        price: currency.DISPLAY.USD.PRICE,
        directVol: currency.DISPLAY.USD.VOLUME24HOURTO,
        totalVol: currency.DISPLAY.USD.VOLUME24HOUR,
        mktCap: currency.DISPLAY.USD.MKTCAP,
        sevenDayChart: `https://images.cryptocompare.com/sparkchart/${
          currency.CoinInfo.Name
        }/USD/latest.png?ts=1555335600`,
        chg24H: currency.DISPLAY.USD.CHANGEPCT24HOUR
      });
    });

    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index"
      },
      {
        title: "Coin",
        dataIndex: "coin",
        key: "coin"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Direct Vol. 24H",
        dataIndex: "directVol",
        key: "directVol"
      },
      {
        title: "Total Vol. 24H",
        dataIndex: "totalVol",
        key: "totalVol"
      },
      {
        title: "Mkt. Cap.",
        dataIndex: "mktCap",
        key: "mktCap"
      },
      {
        title: "7d Chart (USD)",
        dataIndex: "sevenDayChart",
        key: "sevenDayChart",
        render: () => <img src={`sevenDayChart`} alt="chart" />
      },
      {
        title: "Chg. 24H",
        dataIndex: "chg24H",
        key: "chg24H"
      }
    ];

    return (
      <>
        <Button type="primary" onClick={this.start} loading={loading}>
          Reload
        </Button>
        <Table dataSource={data} columns={columns} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ currencies: state.currencies });

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(getData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
