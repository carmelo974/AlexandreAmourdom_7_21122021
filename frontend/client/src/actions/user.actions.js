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
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/upload/${id}`, data)
      .then((res) => {
        console.log(res);
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            console.log(res);
            dispatch({ type: UPLOAD_PICTURE, payload: res.data });
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
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
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
    })
      .then((res) => {
        dispatch({ type: DELETE_ACCOUNT, payload: res });
      })
      .catch((err) => console.log(err));
  };
};
