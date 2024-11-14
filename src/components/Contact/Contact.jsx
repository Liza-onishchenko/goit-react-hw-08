import React from "react";
import css from "./Contact.module.css";

const Contact = ({ name, number, id, onDeleteContacts }) => {
  return (
    <li className={css.listItemContact}>
      🙍‍♂️ {name}: 📱{number}
      <button
        type="button"
        onClick={() => onDeleteContacts(id)}
        className={css.buttonContacts}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
