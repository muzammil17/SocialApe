import { Api } from "./Api";

export const USER_LIKED = "USER_LIKED";
export const GET_SCREAMS = "GET_SCREAMS";
export const USER_UNLIKED = "USER_UNLIKED";
export const REFRESH_FALSE = "REFRESH_FALSE";
export const REFRESH_TRUE = "REFRESH_TRUE";
export const ADD_SCREAM = "ADD_SCREAM";
export const ADD_COMMENT_COUNT = "ADD_COMMENT_COUNT";

export const getScreams = (screams) => {
  return {
    type: GET_SCREAMS,
    screams,
  };
};

export const refreshTrue = () => {
  return {
    type: REFRESH_TRUE,
  };
};

export const refreshFalse = () => {
  return {
    type: REFRESH_FALSE,
  };
};

export const addCommentCount = (id) => {
  return {
    type: ADD_COMMENT_COUNT,
    id,
  };
};

export const getAllScreams = () => (dispatch) => {
  Api("get", "/screams")
    .then((res) => {
      dispatch(getScreams(res.data));
    })
    .then(() => dispatch(refreshFalse()))
    .catch((err) => {
      console.log(err.response);
      dispatch(refreshFalse());
    });
};

export const likeScream = (user) => {
  return {
    type: USER_LIKED,
    user,
  };
};

export const unLikeScream = (id) => {
  return {
    type: USER_UNLIKED,
    id,
  };
};

const addScream = (body) => {
  return {
    type: ADD_SCREAM,
    body,
  };
};

export const likeScreamAction = (user) => (dispatch) => {
  Api("get", `/screams/${user.screamId}/like`, user)
    // .then((res) => console.log(res))
    .catch((err) => console.log(err.response));
};

export const unLikeScreamAction = (id) => (dispatch) => {
  Api("get", `/screams/${id}/unlike`, id).catch((err) =>
    console.log(err.response)
  );
};

export const addScreamAction = (data) => (dispatch) => {
  Api("post", "/scream", data)
    .then((res) => {
      dispatch(addScream(res.data));
    })
    .catch((err) => console.log(err.response));
};
