import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { LoginUserSchema } from "../../schemas";
import { logIn } from "../../redux/auth/operations";
import { Toaster, toast } from "react-hot-toast";

import css from "./LoginForm.module.css";

const LoginForm = () => {
  const initialValues = { email: "", password: "" };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <div>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
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
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
