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
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logo.png" className="w-30" alt="Flowbite Logo" />
        </a>
        <div className=" bg-#ffffff flex md:order-2 space-x-3  md:space-x-0 rtl:space-x-reverse">
          {!token ? (
            <>
              <a
                href="/signUp"
                className=" bg-#ffffff flex items-center space-x-3 rtl:space-x-reverse mr-4"
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
        </div>
        {/*  */}

        {/*  */}
        <div
          className=" bg-#fffff items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className=" bg-#fffff flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  md:border-0 ">
            <li className="bg-#fffff ">
              <a
                href="/"
                className="block py-2 px-3 text-white  rounded md:text-text md:dark:text"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="bg-#fffff">
              <a
                href="/interviewType"
                className=" bg-#fffff block py-2 px-3 text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/userdashboard"
                className=" bg-#fffff block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
