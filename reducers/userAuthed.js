import {
  USER_LOGIN,
  RESTORE_TOKEN,
  SIGN_OUT,
  SIGNIN_ERROR,
  REMOVE_ERROR,
  USER_SIGNUP,
  LOADING_INDICATOR,
  USER_DETAIL,
  REFRESH_TOKEN,
} from "../actions/userAuthed";
import { USER_LIKED, USER_UNLIKED } from "../actions/screamActions";

let initState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  credentialError: "",
  loadingIndicator: false,
  likes: [],
  notifications: [],
  userCredential: null,
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

    case REFRESH_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };

    case USER_DETAIL:
      return {
        ...state,
        userCredential: action.userData.credentials,
        likes: [...state.likes, ...action.userData.likes],
        notifications: [
          ...state.notifications,
          ...action.userData.notifications,
        ],
        loadingIndicator: false,
        isLoading: false,
      };
    case USER_LIKED:
      return {
        ...state,
        likes: [...state.likes, action.user],
      };

    case USER_UNLIKED:
      return {
        ...state,
        likes: state.likes.filter((scream) => scream.screamId !== action.id),
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        isLoading: false,
        credentialError: "",
        likes: [],
        notifications: [],
        loadingIndicator: false,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        credentialError: action.error,
        loadingIndicator: false,
        isLoading: false,
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
        isLoading: false,
      };

    default:
      return state;
  }
}

export default userAuthed;
