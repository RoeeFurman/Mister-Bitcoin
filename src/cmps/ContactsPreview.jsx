import { Link } from "react-router-dom";

export function ContactsPreview({ contact, onRemoveContact }) {
  return (
    <section className="contact">
      <Link to={`/contact/${contact._id}`}>
        <img
          src={`https://robohash.org/set_set5/${contact._id}.png`}
          alt="img"
        />
        <h2>{contact.name}</h2>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveContact(contact._id)} key={contact._id}>
          Delete
        </button>
        <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
      </section>
    </section>
  );
}
