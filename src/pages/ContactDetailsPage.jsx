import { Component } from "react";
import { Link } from "react-router-dom";
import { TransferFund } from "../cmps/TransferFund";
import contactService from "../services/contactService.js";
import { MovesList } from "../cmps/MovesList";
import { userService } from "../services/userService";

export class ContactDetailsPage extends Component {
  state = {
    contact: null,
  };

  onBack = () => {
    this.props.history.push("/contact");
    // this.props.history.goBack()
  };

  componentDidMount() {
    this.loadContact();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  async loadContact() {
    const contact = await contactService.getContactById(
      this.props.match.params.id
    );
    this.setState({ contact });
  }

  onTransferCoins = (amount) => {
    userService.addMove(this.state.contact, amount);
    this.loadContact();
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading Contact</div>;
    return (
      <section className="bitcoin-app">
        <div>
          <h2 className="name">{contact.name}</h2>
          <img
            className="details"
            src={`https://robohash.org/set_set5/${contact._id}.png`}
            alt="img"
          />
          <h2>
            <span>ID: </span>
            {contact._id}
          </h2>
          <h2>
            <span>E-mail: </span>
            {contact.email}
          </h2>
          <h2>
            <span>Phone: </span>
            {contact.phone}
          </h2>
        </div>
        <div className="actions">
          <TransferFund
            contact={contact}
            onTransferCoins={this.onTransferCoins}
          />
          <MovesList moves={userService.getMoves(contact)} title="Your Moves" />
          <button onClick={this.onBack}>Back</button>
        </div>
      </section>
    );
  }
}
