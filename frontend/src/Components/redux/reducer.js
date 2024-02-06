import {
  Change_Type,
  Get_Login_Success,
  Latest_Message,
  Login_Fail,
  Login_Request,
  Login_Success,
  Register_User_Fail,
  Register_User_Request,
  Register_User_Success,
} from "./actionType";

const initstate = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: null,
  loginUser: null,
  type: "",
  latest: "",
  userImage:"",
};

export const reducer = (state = initstate, { type, payload }) => {
  switch (type) {
    case Register_User_Request:
      return { ...state, isLoading: true };
    case Register_User_Success:
      return { ...state,isLoading: false, isError: false };
    case Register_User_Fail:
      return { ...state, isError: true };
    case Login_Request:
      return { ...state, isLoading: true, isError: false };
    case Login_Success:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        userImage: payload.existinguser.userImage,
        token: payload.token,
      };
    case Login_Fail:
      return { ...state, isLoading: false, isError: true };
    case Change_Type:
      return { ...state, type: payload };
    case Latest_Message:
      return {
        ...state,
        latest: payload,
      };

    default:
      return state;
  }
};
