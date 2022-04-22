import {
  DELETE_ACCOUNT,
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, picture: action.payload },
        },
      };

    case UPDATE_BIO:
      return {
        ...state,
        data: {
          ...state.data,
          user: { ...state.data.user, bio: action.payload },
        },
      };

    case DELETE_ACCOUNT:
      console.log(state);
      return state
    default:
      return state;
  }
}
