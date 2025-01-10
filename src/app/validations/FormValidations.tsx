import * as Yup from "yup";

// SignIn Validation Schema
export const signInValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Username is required"),
  password: Yup.string()
    .trim()
    .required("Password is required"),
});

// SignUp Validation Schema
export const signUpValidationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Full name is required"),
  username: Yup.string()
    .trim()
    .required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
