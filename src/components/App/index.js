import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Table, Button, Avatar, Tag } from "antd";

import { fetchCoins, fetchAllCoins } from "../../actions/coinActions";

class App extends Component {
  state = {
    loading: false,
    fetchingAll: false,
    buttonStyle: { display: "initial" }
  };

  componentWillMount() {
    this.props.fetchCoins();
  }

  refresh = () => {
    this.state.fetchingAll
      ? this.props.fetchAllCoins()
      : this.props.fetchCoins();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };

  displayAllCoins = () => {
    this.props.fetchAllCoins();
    this.setState({ fetchingAll: true });
    setTimeout(() => {
      this.setState({
        buttonStyle: { display: "none" }
      });
    }, 2000);
  };

  render() {
    console.log(this.props);
    const { currencies } = this.props;
    const { loading } = this.state;
    const baseUrl = "https://www.cryptocompare.com";

    const data = [];
    currencies.forEach((currency, index) => {
      data.push({
        key: currency.CoinInfo.Id,
        link: `${baseUrl}${currency.CoinInfo.Url}`,
        index: index + 1,
        coin: {
          fullname: currency.CoinInfo.FullName,
          name: currency.CoinInfo.Name,
          icon: `${baseUrl}${currency.CoinInfo.ImageUrl}`
        },
        price: currency.DISPLAY.USD.PRICE,
        directVol: currency.DISPLAY.USD.VOLUME24HOURTO,
        totalVol: currency.DISPLAY.USD.TOTALVOLUME24HTO,
        mktCap: currency.DISPLAY.USD.MKTCAP,
        sevenDayChart: `https://images.cryptocompare.com/sparkchart/${
          currency.CoinInfo.Name
        }/USD/latest.png?ts=1555401600`,
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
        key: "coin",
        render: coin => (
          <div className="display-icon">
            <Avatar src={coin.icon} />
            <div className="display-names">
              <div>{coin.fullname}</div>
              <div>{coin.name}</div>
            </div>
          </div>
        )
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: price => <Tag>{price}</Tag>
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
        render: sevenDayChart => <img src={sevenDayChart} alt="chart" />
      },
      {
        title: "Chg. 24H",
        dataIndex: "chg24H",
        key: "chg24H",
        render: chg24H => (
          <Tag color={chg24H > 0 ? "green" : "red"}>{chg24H}%</Tag>
        )
      }
    ];

    return (
      <>
        <Button type="primary" onClick={this.refresh} loading={loading} block>
          Reload
        </Button>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          onRow={record => {
            return {
              onClick: () => {
                window.location = record.link;
              }
            };
          }}
        />
        <Button
          type="primary"
          onClick={this.displayAllCoins}
          block
          style={this.state.buttonStyle}
        >
          View All Coins
        </Button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.currencies.items
});

export default connect(
  mapStateToProps,
  { fetchCoins, fetchAllCoins }
)(App);
