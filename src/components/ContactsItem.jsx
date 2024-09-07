import React from 'react';

import styles from './ContactsItem.module.css';

function ContactsItem({ data: { id, firstName, lastName, email, phone }, deletHandler, editHandler }) {
  return (
    <li className={styles.item} key={id}>
      <p>{firstName} {lastName}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <button onClick={() => deletHandler(id)}>Remove</button>
      <button onClick={() => editHandler(id)}>Edit</button>
    </li>
  );
}

export default ContactsItem;
