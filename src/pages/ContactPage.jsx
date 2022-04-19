import { Component } from "react";
import contactService from "../services/contactService.js";
import { ContactsList } from "../cmps/ContactsList.jsx";
import { ContactFilter } from "../cmps/ContactsFilter.jsx";
import { ContactDetailsPage } from "../pages/ContactDetailsPage.jsx";
import { Link } from "react-router-dom";

export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: null,
  };

  componentDidMount() {
    this.loadContacts();
  }

  async loadContacts() {
    const contacts = await contactService.getContacts(this.state.filterBy);
    this.setState({ contacts });
  }

  onChangeFilter = (filterBy) => {
    // console.log("filterBy:", filterBy);
    this.setState({ filterBy }, this.loadContacts);
  };

  onRemoveContact = async (contactId) => {
    await contactService.deleteContact(contactId);
    this.loadContacts();
  };

  render() {
    const { contacts } = this.state;
    if (!contacts) return <div>Loading Contacts</div>;
    return (
      <section className="contacts">
        <div className="sec-header">
          <ContactFilter onChangeFilter={this.onChangeFilter} />
          <Link to="contact/edit" className="add-btn">
            Add Contact
          </Link>
        </div>
        <ContactsList
          contacts={contacts}
          onRemoveContact={this.onRemoveContact}
        />
      </section>
    );
  }
}
