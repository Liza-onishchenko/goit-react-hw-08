import React from "react";
import css from "./Contact.module.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const Contact = ({ name, number, id, onDeleteContacts }) => {
  return (
    <li className={css.listItemContact}>
      <span className={css.contactItem}>
        <PersonIcon sx={{ color: "#ff9800", fontSize: "20px" }} />
        {name}
      </span>

      {/* Іконка для номера телефону */}
      <span className={css.contactItem}>
        <SmartphoneIcon
          style={{
            color: "#ff9800", // колір іконки
            fontSize: "20px", // Розмір іконки
            marginRight: "5px", // Відступ праворуч від іконки
            transform: "translateY(+2px)", // верх іконку на 2px
          }}
        />
        {number}
      </span>
      <Button
        variant="contained"
        style={{ backgroundColor: "#ff9800" }}
        onClick={() => onDeleteContacts(id)}
        startIcon={<DeleteIcon style={{ color: "white", fontSize: "18px" }} />}
        className={css.buttonContacts}
      >
        Delete
      </Button>
    </li>
  );
};

export default Contact;
