import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { addContact } from "../../redux/contacts/operations";
import { AddContactsSchema } from "../../schemas";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

import css from "./ContactForm.module.css";

const ContactForm = () => {
  const initialValues = { name: "", number: "" };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    toast.success("The contact was successfully created!");
    actions.resetForm();
  };

  return (
    <div className={css.contactFormContainer}>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={AddContactsSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>
              <PersonIcon
                sx={{
                  fontSize: "18px",
                  color: "#ff9800",
                  marginRight: 1,
                }}
              />{" "}
              Name:
            </span>
            <Field
              type="text"
              name="name"
              className={css.inputContact}
              placeholder="Ivan Ivanov"
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <span>
              {" "}
              <PhoneIcon
                sx={{
                  fontSize: "18px",
                  color: "#ff9800",
                  marginRight: 1,
                }}
              />{" "}
              Number:
            </span>
            <Field
              type="text"
              name="number"
              className={css.inputContact}
              placeholder="+380 234 567 890"
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </label>

          <Button
            type="submit"
            variant="contained"
            className={css.buttonForm}
            sx={{
              backgroundColor: "#ff9800",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#e68900",
                color: "#fff",
              },
            }}
            onClick={() => handleSubmit}
            startIcon={<AddIcon />}
            fullWidth
          >
            Add Contact
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
