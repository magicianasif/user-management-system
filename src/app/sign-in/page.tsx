"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { useUserContext } from "../context/UserContext";
import Button from "../components/Button";
import { signInValidationSchema } from "../validations/FormValidations";

const SignIn: React.FC = () => {
  const router = useRouter();
  const { login } = useUserContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      );

      if (user) {
        login(username);
        router.push("/dashboard");
      } else if (username === "admin" && password === "admin") {
        login("admin");
        router.push("/admin");
      } else {
        formik.setErrors({
          username: "Invalid credentials",
          password: "Invalid credentials",
        });
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-gray-400 flex justify-center items-center"
      data-testid="signin-container"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
        data-testid="signin-form-container"
      >
        <h2
          className="text-3xl font-semibold text-center text-black-500 mb-6"
          data-testid="signin-header"
        >
          Sign In
        </h2>

        <form onSubmit={formik.handleSubmit} data-testid="signin-form">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              data-testid="username-input"
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

          <div className="mb-6">
            <input
              type="password"
              name="password"
              className={`w-full p-3 border rounded-lg transition-colors ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:border-orange-500`}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              data-testid="password-input"
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

          <Button
            label="Login"
            onClick={() => formik.submitForm()}
            data-testid="signin-button"
          />
        </form>

        <div className="mt-4 text-center" data-testid="signup-link-container">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link
            href="/sign-up"
            className="text-orange-600 hover:text-orange-500"
            data-testid="signup-link"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
