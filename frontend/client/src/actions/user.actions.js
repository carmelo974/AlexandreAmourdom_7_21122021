import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, id, data)
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

export const updateBio = (id, data) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/updateOne/`, id, data)
      .then((res) => {
        console.log(res);
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/getOneUser/` + id)
          .then((res) => {
            dispatch({ type: UPDATE_BIO, payload: res });
          });
      })
      .catch((err) => console.log(err));
  };
};
