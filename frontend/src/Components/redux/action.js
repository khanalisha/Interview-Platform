import axios from "axios";
import {
  Get_Login_Success,
  Login_Fail,
  Login_Success,
  Login_User_Image,
  Register_User_Fail,
  Register_User_Request,
  Register_User_Success,
} from "./actionType";

export const RegisterUser = (registerUser) => (dispatch) => {
  dispatch({ type: Register_User_Request });
  axios
    .post(`${process.env.REACT_APP_API_URL}/register`, registerUser)
    .then((res) => {
      console.log(res);
      dispatch({ type: Register_User_Success });
    })
    .catch((error) => {
      dispatch({ type: Register_User_Fail });
    });
};

export const LoginUser = (userObj, navigate) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/login`, userObj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const userData = res.data;
      console.log(userData.existinguser.userImage, "loginUser");
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userImage", userData.existinguser.userImage);

      navigate("/interviewType");
      dispatch({
        type: Login_Success,
        payload: userData,
        isAuth: true,
      });
     
    })
    .catch((error) => {
      console.error("Authentication error:", error);
      dispatch({ type: Login_Fail });
    });
};
