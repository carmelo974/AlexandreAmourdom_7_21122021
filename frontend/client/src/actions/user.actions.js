import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/upload/${id}`,
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        return axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          console.log(res.data);
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.user.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (id, bio) => {
  // ne fonctionne pa  en dynamique
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      data: { bio },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: res.data.user.bio });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteAccount = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      data: { id },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_ACCOUNT, payload: res });
      })
      .catch((err) => console.log(err));
  };
};
