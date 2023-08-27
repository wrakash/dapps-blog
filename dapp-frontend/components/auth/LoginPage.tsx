"use client";
import { TextField } from "@/components/input";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { SpinnerLoader } from "../loader";

export const LoginPageComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const isStrongPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onInputChangeHandler = (value: string, name: string) => {
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!isEmailValid(credentials.email)) {
      setErrors({ ...errors, email: true });
      return;
    }

    if (!credentials.password) {
      setErrors({ ...errors, password: true });
      return;
    }

    if (!isStrongPassword(credentials.password)) {
      setErrors({ ...errors, password: true });
      return;
    }

    setLoading(true);
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/",
    })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <TextField
              placeholder="Enter the email address"
              value={credentials.email}
              type="email"
              onChange={(e) => onInputChangeHandler(e.target.value, "email")}
              className={`w-full h-10 focus:outline-none py-1 px-1 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            >
              <label htmlFor="Email" className="font-bold">
                Email
              </label>
            </TextField>
            {errors.email && (
              <p className="text-red-500">Please enter a valid email</p>
            )}
          </div>
          <div className="mb-4">
            <TextField
              placeholder="Enter the password"
              value={credentials.password}
              type="password"
              onChange={(e) => onInputChangeHandler(e.target.value, "password")}
              className={`w-full h-10 focus:outline-none py-1 px-1 rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            >
              <label htmlFor="Password" className="font-bold">
                Password
              </label>
            </TextField>
            {errors.password && (
              <p className="text-red-500">
                Password should be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one digit, and
                one special character.
              </p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
