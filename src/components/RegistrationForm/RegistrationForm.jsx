import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterUserSchema } from "../../schemas";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Toaster } from "react-hot-toast";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const initialValues = { name: "", email: "", password: "" };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <div className={css.containerRegistr}>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name:</span>
            <Field
              type="text"
              name="name"
              className={css.inputContact}
              placeholder="Ivan Ivanov"
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              className={css.inputContact}
              placeholder="example.email@example.com"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              className={css.inputContact}
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </label>

          <button type="submit" className={css.buttonForm}>
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
