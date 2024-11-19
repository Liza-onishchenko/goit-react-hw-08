import React, { useEffect, useState } from "react";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import ModalDelete from "../Modal/ModalDelete";
import { Toaster, toast } from "react-hot-toast";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/slice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

export const ContactList = () => {
  // для контролю модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Оформлення підписки
  const filteredContacts = useSelector(selectFilteredContacts);

  // Функція для відправки дії
  const dispatch = useDispatch();

  // Відкрити модальне вікно і вибрати контакт для видалення
  const openModal = (contactId) => {
    setContactToDelete(contactId);
    setIsModalOpen(true);
  };

  // Закрити модальне вікно
  const closeModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  // Підтвердити видалення
  const onDeleteContacts = () => {
    dispatch(deleteContact(contactToDelete));
    toast.success("Contact deleted successfully!");
    closeModal();
  };

  return (
    <div>
      <Toaster />
      <ul className={css.listContact}>
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDeleteContacts={openModal} // Передати як функцію
          />
        ))}
      </ul>

      {/* Модальне вікно для підтвердження видалення */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={closeModal}>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            Delete Contact
          </DialogTitle>
          <DialogActions sx={{ padding: "10px", justifyContent: "center" }}>
            <Button
              onClick={closeModal}
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                "&:hover": {
                  backgroundColor: "#160a5a",
                },
                fontWeight: "bold",
                padding: "6px 20px",
                marginRight: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onDeleteContacts}
              sx={{
                backgroundColor: "#f44336 ",
                color: "white",
                "&:hover": {
                  backgroundColor: "#160a5a",
                },
                fontWeight: "bold",
                padding: "6px 20px",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactList;
