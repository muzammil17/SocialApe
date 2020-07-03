import { Api } from "./Api";

export const USER_LIKED = "USER_LIKED";
export const GET_SCREAMS = "GET_SCREAMS";
export const USER_UNLIKED = "USER_UNLIKED";
export const REFRESH_FALSE = "REFRESH_FALSE";
export const REFRESH_TRUE = "REFRESH_TRUE";

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

export const likeScreamAction = (user) => (dispatch) => {
  Api("get", `/screams/${user.screamId}/like`, user)
  .then((res) => console.log(res))
  .catch((err) =>
    console.log(err.response)
  );
};

export const unLikeScreamAction = (id) => (dispatch) => {
  Api("get", `/screams/${id}/unlike`, id).catch((err) =>
    console.log(err.response)
  );
};
