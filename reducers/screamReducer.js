import {
  GET_SCREAMS,
  USER_LIKED,
  USER_UNLIKED,
  REFRESH_FALSE,
  REFRESH_TRUE,
  ADD_SCREAM,
} from "../actions/screamActions";

let initState = {
  screams: [],
  refreshingHome: false,
};

const screamReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SCREAMS:
      return {
        ...state,
        screams: action.screams,
        refreshingHome: true,
      };

    case USER_LIKED:
      return {
        ...state,
        screams: state.screams.map((scream) => {
          if (scream.id === action.user.screamId) {
            return {
              ...scream,
              likeCount: scream.likeCount + 1,
            };
          } else return scream;
        }),
      };

    case USER_UNLIKED:
      return {
        ...state,
        screams: state.screams.map((scream) => {
          if (scream.id === action.id) {
            if (scream.likeCount > 0) {
              return {
                ...scream,
                likeCount: scream.likeCount - 1,
              };
            }
          } else return scream;
        }),
      };

    case REFRESH_FALSE:
      return {
        ...state,
        refreshingHome: false,
      };

    case REFRESH_TRUE:
      return {
        ...state,
        refreshingHome: true,
      };

    case ADD_SCREAM:
      return {
        ...state,
        screams : [action.body,...state.screams]
      };

    default:
      return state;
  }
};

export default screamReducer;
