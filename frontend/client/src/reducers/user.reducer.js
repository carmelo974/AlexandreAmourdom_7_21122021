import {
  DELETE_ACCOUNT,
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  // console.log(action.payload);
  // console.log(state);
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, data: {...state.data, user : {...state.data.user, picture: action.payload}}
      }
      // return {
      //   ...state,
      //   picture: action.payload,
      // };
    case UPDATE_BIO:
      return {
        ...state, data: {...state.data, user : {...state.data.user, bio: action.payload}}
      }
      // return {
      //   ...state,
      //   bio: action.paylod,
      // };
    case DELETE_ACCOUNT:
      return state.filter((user) => user.id !== action.payload.userId);
    default:
      return state;
  }
}
