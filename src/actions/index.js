import _ from "lodash";
import jsonplaceholder from "../apis/jsonPlaceholder";

const FETCH_POSTS = "FETCH_POSTS";
const FETCH_USER = "FETCH_USER";

export const fetchPostsAndUsers = () => async (dispatch, getState ) => {
  await dispatch(fetchPosts());
  const userId = _.uniq(_.map(getState().posts, 'userId'));
  userId.forEach((id) => dispatch(fetchUser(id)));
}

export const fetchPosts = () => async (dispatch) => {
  const res = await jsonplaceholder.get("/posts");
  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const user = await jsonplaceholder.get(`/users/${id}`);
  dispatch({ type: FETCH_USER, payload: user.data });
}


// export const fetchUser = (id) => async (dispatch) => _fetchUser(id, dispatch);


// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const user = await jsonplaceholder.get(`/users/${id}`);
//   dispatch({ type: FETCH_USER, payload: user.data });
// });
