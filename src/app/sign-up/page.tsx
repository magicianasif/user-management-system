"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { signUpValidationSchema } from "../validations/FormValidations"; // Import SignUp validation schema
import Button from "../components/Button";

interface User {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const { username, password, email, fullName } = values;
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((user) => user.username === username)) {
        formik.setErrors({ username: "User already exists!" });
        return;
      }

      users.push({ username, password, email, fullName });
      localStorage.setItem("users", JSON.stringify(users));
      resetForm();
      router.push("/");

    },
  });

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-black-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              data-testid="fullName-input"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div
                className="text-red-500 text-sm mt-1"
                data-testid="fullName-error"
              >
                {formik.errors.fullName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              data-testid="username-input"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div
                className="text-red-500 text-sm mt-1"
                data-testid="username-error"
              >
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              data-testid="email-input"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div
                className="text-red-500 text-sm mt-1"
                data-testid="email-error"
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div
                className="text-red-500 text-sm mt-1"
                data-testid="password-error"
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              data-testid="confirmPassword-input"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div
                  className="text-red-500 text-sm mt-1"
                  data-testid="confirmPassword-error"
                >
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <Button label="Register" onClick={formik.handleSubmit} />
          </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            href="/sign-in"
            className="text-orange-600 hover:text-orange-500"
            data-testid="login-link"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
