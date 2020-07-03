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
export const USER_DETAIL = "USER_DETAIL";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

import jwt_decode from "jwt-decode";
import { getAllScreams } from "./screamActions";

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
  AsyncStorage.removeItem("refreshToken");

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

export const restoreTokenAction = (token) => (dispatch) => {
  console.log("ran");
  dispatch(getAllScreams());
  dispatch(getUserDetailAction());
  dispatch(restoreToken(token));
};

export const refreshToken = (token) => {
  return {
    type: REFRESH_TOKEN,
    token,
  };
};

export const userLoginAction = (credentials) => (dispatch) => {
  Api("post", "/login", credentials)
    .then((res) => {
      console.log(res);
      console.log(JSON.parse(res.data.refreshToken));
      let token = `Bearer ${res.data.token}`;
      AsyncStorage.setItem("token", token);
      dispatch(userLogin(token));
      AsyncStorage.setItem("refreshToken", JSON.parse(res.data.refreshToken));
      axios.defaults.headers["Authorization"] = token;
      dispatch(getUserDetailAction());
      dispatch(getAllScreams());
    })
    .catch((err) => {
      console.log("error", err);
      if (err.response) {
        dispatch(signinError(err.response.data.general));
      }
    });
};

export const userSignupAction = (credentials) => (dispatch) => {
  Api("post", "/signup", credentials)
    .then((res) => {
      let token = `Bearer ${res.data.token}`;
      dispatch(userSignUp(token));
      AsyncStorage.setItem("token", token);
      AsyncStorage.setItem("refreshToken", JSON.parse(res.data.refreshToken));
      axios.defaults.headers["Authorization"] = token;
      dispatch(getUserDetailAction());
      dispatch(getAllScreams());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(signinError(err.response.data));
    });
};

export const getUserDetailAction = () => (dispatch) => {
  Api("get", "/user")
    .then((res) => {
      dispatch(getUserDetail(res));
    })
    .catch((err) => console.log(err.response));
};

export const getUserDetail = (data) => {
  return {
    type: USER_DETAIL,
    userData: data.data,
  };
};

export const refreshTokenAction = (reqData) => (dispatch) => {
  axios({
    method: "post",
    url:
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyC3BvQV9EwuKUubHfMVif-WuJ28omiQfKE",
    data: reqData,
    config: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => {
      console.log(res);
      let idToken = `Bearer ${res.data.id_token}`;
      AsyncStorage.removeItem("token");
      AsyncStorage.setItem("token", idToken);
      AsyncStorage.setItem("refreshToken", res.data.refresh_token);
      axios.defaults.headers["Authorization"] = idToken;
      dispatch(getUserDetailAction());
      dispatch(getAllScreams());
      dispatch(refreshToken(res.data.id_token));
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
    });
};
