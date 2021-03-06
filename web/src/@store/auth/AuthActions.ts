import { toast } from "react-toastify";
import { getRegisterUrl, loginUserUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { AuthActionTypes } from "../redux/actionTypes";
import { User } from "@models/User";

export const submitRegister = (username, email, password, history) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.REGISTER_USER_START,
    });
    const request = {
      email: email,
      password: password,
      userName: username,
    };
    const url = getRegisterUrl();
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          registerUserSuccess(dispatch, data, history);
        } else {
          registerUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.data === "Email Already Exist") {
          toast.error("Email Already Exist");
        } else if (error.response.data === "User Name Already Exist") {
          toast.error("User Name Already Exist");
        }
        registerUserFail(dispatch, "There was an error connection2");
      });
  };
};

const registerUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.REGISTER_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const registerUserSuccess = (dispatch, data, history) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("userId", data._id);
  toast.success(`${data?.username} Welcome to Streamlia`);
  dispatch({
    type: AuthActionTypes.REGISTER_USER_SUCCESS,
    payload: data,
  });
  history.push("/live-streams");
};

export const submitLogin = (user: User, history: any) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.LOGIN_USER_START,
    });
    const request = {
      email: user.email,
      password: user.password,
    };
    const url = loginUserUrl();
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          loginUserSuccess(dispatch, data, history);
        } else {
          loginUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response.data === "Email not found") {
          toast.error("Email not found");
        } else if (error.response.data === "Password is invalid!") {
          toast.error("Password is invalid!");
        }
        loginUserFail(dispatch, "There was an error connection2");
      });
  };
};
const loginUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.LOGIN_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const loginUserSuccess = (dispatch, data, history) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  localStorage.setItem("access_token", data.accessToken);

  localStorage.setItem("userId", data._id);
  dispatch({
    type: AuthActionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  });
  history.push("/live-streams");
};
