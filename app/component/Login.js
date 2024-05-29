"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { SignIn } from "@/services/firebase";
import { GetSignErrorMessage } from "@/services/firebase";
import { useUser } from "../component/context/user";

export default function Login() {
  const GetErrorMessage = (type) => {
    switch (type) {
      case "minLength":
        return "Password must be at least 6 characters";
      case "required":
      default:
        return "Field is required";
    }
  };

  // Component to display error messages
  function Errors({ error }) {
    if (!error) {
      return null;
    }
    const { type } = error;
    const message = GetErrorMessage(type);
    return <div className="text-red-500">{message}</div>;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const { email, password } = values;
    // console.log(values);
    try {
      await SignIn(email, password);
    } catch (error) {
      const message = GetSignErrorMessage(error.code);
      console.log(message);
    }
  };

  console.log({ errors });
  const user = useUser();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              {...register("email", { required: true })}
            />
            <Errors error={errors.email} />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <Errors error={errors.password} />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
