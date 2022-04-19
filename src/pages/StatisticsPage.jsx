import { Component } from "react";
import { userService } from "../services/userService.js";
import { bitcoinService } from "../services/bitcoinService.js";
import Chart from "../cmps/Chart";

export class StatisticsPage extends Component {
  state = {
    user: null,
    rateCoin: null,
    bitcoinMarketPrice: null,
    period: "year",
  };

  componentDidMount() {
    this.loadUser();
    this.loadRateCoin();
    this.loadBitcoinMarketPrice();
  }

  async loadUser() {
    const user = await userService.getUser();
    this.setState({ user });
  }
  async loadRateCoin() {
    const rateCoin = await bitcoinService.getRate();
    this.setState({ rateCoin });
  }

  async loadBitcoinMarketPrice(period) {
    var bitcoinMarketPrice = await bitcoinService.getMarketPrice(period);
    bitcoinMarketPrice = bitcoinMarketPrice.map((b) => b.y);
    this.setState({ bitcoinMarketPrice });
  }

  render() {
    const { user, rateCoin, bitcoinMarketPrice } = this.state;
    if (!user || !rateCoin || !bitcoinMarketPrice)
      return <div>Loading User</div>;
    return (
      <section className="statistics">
        <h2>Statistics</h2>
        <Chart bitcoinData={bitcoinMarketPrice} />
        <button onClick={() => this.loadBitcoinMarketPrice("year")}>
          Year
        </button>
        <button onClick={() => this.loadBitcoinMarketPrice("months")}>
          Month
        </button>
        <button onClick={() => this.loadBitcoinMarketPrice("days")}>Day</button>
      </section>
    );
  }
}
