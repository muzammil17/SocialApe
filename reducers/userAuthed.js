import {
  USER_LOGIN,
  RESTORE_TOKEN,
  SIGN_OUT,
  SIGNIN_ERROR,
  REMOVE_ERROR,
  USER_SIGNUP,
  LOADING_INDICATOR,
} from "../actions/userAuthed";

let initState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  credentialError: "",
  loadingIndicator: false,
};

function userAuthed(state = initState, action) {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
        credentialError: "",
        loadingIndicator: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        credentialError: "",
        loadingIndicator: false,
      };

    case USER_SIGNUP:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        credentialError: "",
        loadingIndicator: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        isLoading: false,
        credentialError: "",
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        credentialError: action.error,
        loadingIndicator: false,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        credentialError: "",
        loadingIndicator: false,
      };

    case LOADING_INDICATOR:
      return {
        ...state,
        loadingIndicator: true,
      };

    default:
      return state;
  }
}

export default userAuthed;
