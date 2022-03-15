import {
  DELETE_COMMENT,
  DELETE_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          // return {
          //   ...state, post: action.paylod
          // }
           return {
             ...post,
             post_content: action.payload,
           };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
