import { Component } from "react";
import { userService } from "../services/userService";

export class TransferFund extends Component {
  state = {
    amount: "",
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState({ amount: value });
  };

  onTransferCoins = () => {
    if (!this.state.amount) return;
    this.props.onTransferCoins(this.state.amount);
    // userService.addMove(this.props.contact, this.state.amount);
    this.setState({ amount: "" });
  };

  render() {
    return (
      <section className="transfer">
        <h3>Transfer coins to {this.props.contact.name}</h3>
        <div class="input-btn">
          <label>
            Amount:
            <input
              type="number"
              onChange={this.handleChange}
              value={this.state.amount}
              required
            />
          </label>
          <button onClick={this.onTransferCoins}>Transfer</button>
        </div>
      </section>
    );
  }
}
