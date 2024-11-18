import React, { useEffect, useState } from "react";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import ModalDelete from "../Modal/ModalDelete";
import { Toaster, toast } from "react-hot-toast";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/slice";

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
            onEditContacts={() => openEditModal(contact)} // Передаємо функцію для редагування
          />
        ))}
      </ul>

      {/* Модальне вікно для підтвердження видалення */}
      {isModalOpen && (
        <ModalDelete
          message="Are you sure you want to delete this contact?"
          onConfirm={onDeleteContacts} // Видалити  при підтвердженні
          onCancel={closeModal} // Закрити модальне вікно при скасуванні
        />
      )}
    </div>
  );
};

export default ContactList;
