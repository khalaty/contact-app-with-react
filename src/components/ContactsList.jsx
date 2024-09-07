import React from 'react';
import ContactsItem from './ContactsItem.jsx';
import styles from './ContactList.module.css';

function ContactsList({ contacts, deletHandler, editHandler }) {
  return (
    <div className={styles.container}>
      <h3>Our Contacts:</h3>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactsItem
              key={contact.id}
              data={contact}
              deletHandler={deletHandler}
              editHandler={editHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contact Yet!</p>
      )}
    </div>
  );
}

export default ContactsList;
