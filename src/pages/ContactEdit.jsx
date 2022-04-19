import { Component, createRef } from "react";
import contactService from "../services/contactService";

export class ContactEdit extends Component {
  state = {
    contact: null,
  };

  inputRef = createRef();

  async componentDidMount() {
    const id = this.props.match.params.id;
    const contact = id
      ? await contactService.getContactById(id)
      : contactService.getEmptyContact();
    this.setState({ contact }, () => {
      this.inputRef.current.focus();
    });
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    await contactService.saveContact({ ...this.state.contact });
    this.props.history.push("/contact");
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    return (
      <section className="contact-edit">
        <h2>{"Add"} Contact</h2>
        <form onSubmit={this.onSaveContact}>
          <label htmlFor="name">Name</label>
          <input
            ref={this.inputRef}
            type="text"
            name="name"
            id="name"
            value={contact.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={contact.email}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={contact.phone}
            onChange={this.handleChange}
          />
          <button>Save</button>
        </form>
      </section>
    );
  }
}
