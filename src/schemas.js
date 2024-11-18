import * as Yup from "yup";

const phoneNumber =
/^\+?[0-9]{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;

export const AddContactsSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too long!")
    .required("Name is required"),
  number: Yup.string()
    .matches(
      phoneNumber,
      "Please enter a valid phone number with country code. Example: +1 800 123 4567 or +44 20 1234 5678"
    )
    .required("Phone number is required"),
});
export const RegisterUserSchema = Yup.object({
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

export const LoginUserSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Invalid email address"),
  password: Yup.string()
    .min(8, "Password lenght must be at least 8 characters")
    .required("Password is required"),
});

export default { RegisterUserSchema, AddContactsSchema, LoginUserSchema };
