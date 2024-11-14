import * as Yup from "yup";

const phoneNumber = /^\+380\d{9}$/;

export const AddContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто коротко!")
    .max(50, "Занадто довго!")
    .required("Ім'я обов'язкове"),
  number: Yup.string()
    .matches(phoneNumber, "Неправильний номер. Номер має бути +380XXXXXXXXX")
    .required("Номер обов'язковий"),
});

export const RegisterUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "The name must be at least 3 characters long. Please try again.")
    .max(20, "The name cannot be longer than 20 characters. Please shorten it.")
    .required("Name is required"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Invalid email address"),
  password: Yup.string()
    .min(8, "Password lenght must be at least 8 characters")
    .required("Password is required"),
});

export const LoginUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Invalid email address"),
  password: Yup.string()
    .min(8, "Password lenght must be at least 8 characters")
    .required("Password is required"),
});

export default { RegisterUserSchema, AddContactsSchema, LoginUserSchema };
