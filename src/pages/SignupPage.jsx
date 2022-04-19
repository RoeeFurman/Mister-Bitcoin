import { Component, createRef } from "react";
import { userService } from "../services/userService";
import Lottie from "react-lottie";
import animationData from "../../src/bitcoin.json";

export class SignupPage extends Component {
  state = {
    userName: null,
  };

  inputRef = createRef();

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

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    console.log(value);
    this.setState({
      userName: value,
    });
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    const user = userService.signUp(this.state.userName);
    this.props.onSignUp(user);
  };

  render() {
    return (
      <section>
        <div className="sign-up title">
          <h1>
            Welcome to Mister BITCoin <i className="fa-brands fa-bitcoin"></i>
          </h1>
          <h2>your awsome digital wallet!</h2>
        </div>
        <div className="sign-up">
          <h2>Please enter your name to start:</h2>
          <form onSubmit={this.onSaveContact}>
            <input
              ref={this.inputRef}
              type="text"
              name="name"
              id="name"
              onChange={this.handleChange}
              required
            />
            <button>Sign up</button>
          </form>
        </div>
        <div className="btc-animation">
          <Lottie options={this.defaultOptions} height={400} width={300} />
        </div>
      </section>
    );
  }
}
