import { Component } from "react";
import { userService } from "../services/userService";

export class MovesList extends Component {
  state = {};
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState({ amount: value });
  };
  onTransferCoins = () => {
    userService.addMove(this.props.contact, this.state.amount);
    this.setState({ amount: "" });
  };
  render() {
    const { moves } = this.props;
    if (!moves) return <div>Loading...</div>;
    if (!moves.length)
      return (
        <div class="moves-list">
          <h3 class="title">Your Moves:</h3>
          <h3>No Activities Yet</h3>
        </div>
      );
    return (
      <section className="moves-list">
        <div>
          <h3 class="title">{this.props.title}</h3>
          {moves.map((move) => {
            return (
              <div key={move.at} className="move">
                <h3>
                  <span>To:</span> {move.to}
                </h3>
                <h3>
                  <span>At: </span> {new Date(move.at).toLocaleString()}
                </h3>
                <h3>
                  <span>Amount: </span>
                  {move.amount}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
