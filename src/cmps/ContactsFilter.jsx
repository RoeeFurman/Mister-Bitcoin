import { Component } from "react";

export class ContactFilter extends Component {
  state = {
    term: "",
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    return (
      <section>
        <section className="contact-filter">
          <h1>Search By: </h1>
          <input
            onChange={this.handleChange}
            type="text"
            id="term"
            name="term"
            value={this.state.term}
          />
        </section>
      </section>
    );
  }
}
