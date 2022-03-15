import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = () => {
  return (dispatch) => {
    return (
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        // .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const addPost = (data, userId) => {
  return (dispatch) => {
    return (
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        // .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
          dispatch({ type: ADD_POST, payload: { data, userId } });
        })
        .catch((err) => console.log(err))
    );
  };
};

export const updatePost = (postId, post_content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { post_content },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: UPDATE_POST, payload: { post_content, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, userId, comment, commmentUsername) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      data: { userId, comment, commmentUsername },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { comment, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      data: { commentId },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId, postId } });
      })
      .catch((err) => console.log(err));
  };
};
