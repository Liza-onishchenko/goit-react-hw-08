import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/slice";

const ContactList = () => {
  //оформлення підписки
  const filteredContacts = useSelector(selectFilteredContacts);

  //ф-ця відправник
  const dispatch = useDispatch();

  const onDeleteContacts = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.listContact}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDeleteContacts={onDeleteContacts}
        />
      ))}
    </ul>
  );
};

export default ContactList;
