import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  getError,
  getIsLoading,
  selectorContacts,
} from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectorContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  //запит на бекенд
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.pageContainer}>
      <h1 className={css.pageTitle}>Phonebook</h1>
      <ContactForm />

      <SearchBox />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
      {Array.isArray(contacts) && contacts.length === 0 && (
        <p>There are no contacts in your phonebook yet!</p>
      )}
    </div>
  );
};

export default ContactsPage;
