import {
  DELETE_COMMENT,
  DELETE_POST,
  GET_POSTS,
  MODIF_COMMENT,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  
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
            post_content: action.payload.post_content,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case MODIF_COMMENT:
      return state.map((post) => {
        
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.Comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                return {
                  ...comment,
                  comment: action.payload.comment,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });
    case DELETE_COMMENT:
      // console.log(state.posts);
      // return state.posts.map((article) => {
      //   console.log(article);
      // });
    return state.posts.map((post) => {
      console.log(state);
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
