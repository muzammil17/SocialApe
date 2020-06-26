import { Api } from "./Api";
import { AsyncStorage } from "react-native";
import axios from "axios";

export const USER_LOGIN = "USER_LOGIN";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";
export const USER_SIGNUP = "USER_SIGNUP";
export const LOADING_INDICATOR = "LOADING_INDICATOR";

const userLogin = (token) => ({
  type: USER_LOGIN,
  token,
});

export const restoreToken = (token) => {
  return {
    type: RESTORE_TOKEN,
    token,
  };
};

export const removeError = () => {
  return {
    type: REMOVE_ERROR,
  };
};

export const signOut = () => {
  AsyncStorage.removeItem("token");
  return {
    type: SIGN_OUT,
  };
};

const signinError = (error) => {
  return {
    type: SIGNIN_ERROR,
    error,
  };
};

export const userLoginAction = (credentials) => (dispatch) => {
  Api("post", "/login", credentials)
    .then((res) => {
      console.log(res);
      let token = `Bearer ${res.data.token}`;
      dispatch(userLogin(token));
      AsyncStorage.setItem("token", token);
      axios.defaults.headers["Authorization"] = token;
      dispatch(getUserDetail());
    })
    .catch((err) => {
      console.log("error", err);
      if (err.response) {
        dispatch(signinError(err.response.data.general));
      }
    });
};

const userSignUp = (token) => {
  return {
    type: "USER_SIGNUP",
    token,
  };
};

export const loadingIndicatorAction = () => {
  return {
    type: LOADING_INDICATOR,
  };
};

export const userSignupAction = (credentials) => (dispatch) => {
  Api("post", "/signup", credentials)
    .then((res) => {
      // console.log(res);
      if (res.data.token) {
        let token = res.data.token;
        AsyncStorage.setItem("token", `Bearer ${JSON.stringify(token)}`);
        dispatch(userSignUp(token));
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(signinError(err.response.data));
    });
};

export const getUserDetail = () => {
  Api("get", "/user")
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response));

  return {
    type: "USER_DETAIL",
  };
};
