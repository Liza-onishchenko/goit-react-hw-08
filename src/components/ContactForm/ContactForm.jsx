import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import AddContactsSchema from "../../schemas";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = { name: "", number: "" };

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddContactsSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>🙍‍♂️Name:</span>
          <Field type="text" name="name" className={css.inputContact} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>

        <label className={css.label}>
          <span>📱Number:</span>
          <Field type="text" name="number" className={css.inputContact} />
          <ErrorMessage name="number" component="span" className={css.error} />
        </label>

        <button type="submit" className={css.buttonForm}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
