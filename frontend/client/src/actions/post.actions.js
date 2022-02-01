import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, post_content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/24`,
      data: { post_content },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { post_content, postId } });
      })
      .catch((err) => console.log(err));
  };
};
