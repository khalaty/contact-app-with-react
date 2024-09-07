import React, { useState, useEffect } from 'react';
import ContactsList from './ContactsList.jsx';
import { v4 } from 'uuid';
import styles from "./Contacts.module.css";

const inputs = [
  { type: "text", name: "firstName", placeholder: "Firstname" },
  { type: "text", name: "lastName", placeholder: "Lastname" },
  { type: "email", name: "email", placeholder: "Email" },
  { type: "number", name: "phone", placeholder: "Phone" },
];

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [isEdit, setIsEdit] = useState(false); // Flag for edit mode
  const [editContactId, setEditContactId] = useState(null); // ID of contact being edited
  const [contact, setContact] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const isValidForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return requiredFields.every((field) => {
      if (!contact[field]) {
        return false;
      }

      if (field === 'email' && !emailRegex.test(contact[field])) {
        return false;
      }

      return true;
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    if (!isValidForm()) {
      setAlert("Please fill in all required fields and ensure email is valid.");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const editHandler = (id) => {
    setIsEdit(true);
    setEditContactId(id);
    const editingContact = contacts.find((contact) => contact.id === id);
    setContact(editingContact);
  };

  const saveEditHandler = () => {
    if (!isValidForm()) {
      setAlert("Please fill in all required fields and ensure email is valid.");
      return;
    }
    setAlert("");
    const updatedContacts = contacts.map((contact) =>
      contact.id === editContactId ? contact : { ...contact }
    );
    setContacts(updatedContacts);
    setIsEdit(false);
    setEditContactId(null);
  };

  // Render based on edit mode
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}
        {isEdit ? (
          <button onClick={saveEditHandler}>Save Edit</button>
        ) : (
          <button onClick={addHandler}>Add Contact</button>
        )}
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <button className={styles.removebutton} onClick={() => setContacts([])}>Clear All Contacts</button>
      <ContactsList contacts={contacts} deletHandler={deleteHandler} editHandler={editHandler} />
    </div>
  );
}

export default Contacts;