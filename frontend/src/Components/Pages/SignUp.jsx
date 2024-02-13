import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/action";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const userformData = {
    userImage: "",
    username: "",
    email: "",
    password: "",
  };
  const [registerUser, setRegisterUser] = useState(userformData);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    console.log(name, type, value);
    setRegisterUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(RegisterUser(registerUser));
    navigate("/login");
  };
  return (
    <form className="max-w-sm mx-auto p-3 m-20 ">
      <h1>CREATE ACCOUNT</h1>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="user_avatar"
      >
        Upload user profile
      </label>
      <input
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        aria-describedby="user_avatar_help"
        id="user_avatar"
        name="userImage"
        value={registerUser.userImage}
        onChange={handleChange}
        type="text"
        placeholder="Enter user image link"
      />

      <div className="mb-5">
        <label
          for="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User Name
        </label>
        <input
          type="text"
          id="email"
          name="username"
          value={registerUser.username}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="userName.."
          required
        />
      </div>
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          value={registerUser.email}
          onChange={handleChange}
          id="password"
          placeholder="Email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          value={registerUser.password}
          onChange={handleChange}
          placeholder="Password"
          id="repeat-password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
    </form>
  );
};
