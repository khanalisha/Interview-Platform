import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { PrivateRoute } from "./Allroutes/PrivateRoute";

export const Navbar = () => {
  // const isAuth = useSelector((store) => store.authReducer.isAuth);
  // console.log(isAuth);
  const token = localStorage.getItem("token");
  const userImage = localStorage.getItem("userImage");
  // console.log(token, "nav");
  console.log(userImage, "nav");

  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userImage");

    navigate("/");
  }
  return (
    <nav className="bg-primary-500 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b1tilpbjhinz59bfvl1j.png"
            className="w-10"
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex md:order-2 space-x-3  md:space-x-0 rtl:space-x-reverse">
          {!token ? (
            <>
              <a
                href="/signUp"
                className="flex items-center space-x-3 rtl:space-x-reverse mr-4"
              >
                <button
                  type="button"
                  className="btn-outline"
                  // className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  SignUp
                </button>
              </a>

              {/* ** */}
              <a
                href="/login"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <button
                  type="button"
                  // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  className="nav-btn"
                >
                  Login
                </button>
              </a>
            </>
          ) : (
            <>
              <div className="flex gap-4">
                <div className="">
                  <img
                    class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 gap-3 object-cover"
                    src={userImage}
                    alt="Bordered avatar"
                  />
                </div>

                <button
                  type="button"
                  onClick={logoutHandler}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {/* <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> */}
        </div>
        {/*  */}

        {/*  */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 bg-[#fefdf8] md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-text md:dark:text"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/interviewType"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/userdashboard"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                User Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
