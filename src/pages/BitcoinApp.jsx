import { Component } from "react";
import { userService } from "../services/userService.js";
import { bitcoinService } from "../services/bitcoinService.js";
import Lottie from "react-lottie";
import animationData from "../../src/bitcoin-wallet.json";
import { SignupPage } from "./SignupPage.jsx";
import { MovesList } from "../cmps/MovesList";

export class BitcoinApp extends Component {
  state = {
    user: null,
    rateCoin: null,
  };

  componentDidMount() {
    this.loadUser();
    this.loadRateCoin();
  }
  async loadUser() {
    const user = await userService.getUser();
    this.setState({ user });
  }
  async loadRateCoin() {
    const rateCoin = await bitcoinService.getRate();
    this.setState({ rateCoin });
  }

  get defaultOptions() {
    return {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYmid slice",
      },
    };
  }

  onSignUp = (user) => {
    this.setState({ user });
  };

  render() {
    const { user, rateCoin } = this.state;
    if (!user) return <SignupPage onSignUp={this.onSignUp} />;
    return (
      <section className="bitcoin-app">
        <div>
          <img
            src={`https://robohash.org/set_set5/${user._id}.png`}
            alt="img"
          />
          <h2>
            <i class="fa-solid fa-user"></i>
            <span>Hello</span> {user.name}!
          </h2>
          <h2>
            <i className="fa-brands fa-bitcoin"></i>
            <span>Coins:</span> {user.coins}
          </h2>
          <h2>
            <span>Bitcoin Rate:</span> {JSON.stringify(rateCoin)}
          </h2>
        </div>
        <div className="btc-animation">
          <Lottie options={this.defaultOptions} height={400} width={300} />
        </div>
        <div>
          <MovesList moves={userService.getMoves(null)} title="Your Moves:" />
        </div>
      </section>
    );
  }
}
