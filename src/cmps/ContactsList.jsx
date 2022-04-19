import { ContactsPreview } from "./ContactsPreview";

export function ContactsList({ contacts, onRemoveContact }) {
  return (
    <section className="contact-preview">
      {contacts.map((contact) => (
        <ContactsPreview
          key={contact._id}
          contact={contact}
          onRemoveContact={onRemoveContact}
        />
      ))}
    </section>
  );
}
