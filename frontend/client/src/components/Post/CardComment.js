import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";

import { dateParser} from "../Utils";

import DeleteComment from "./DeleteComment";

const CardComment = ({ post }) => {
  const [comment, setComment] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // const comments = useSelector((state)=> state.commentReducer)
  console.log(userData.data);

  const handleComment = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(addComment(post.id, userData.id, comment, userData.userName))
        .then(() => dispatch(getPosts()))
        .then(() => setComment(""));
    }
  };

  return (
    <div className="comments-container">
      {post.Comments.map((comment, idx) => {
        return (
          <div
            className={
              comment.comment.userId == userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={idx}
          >
            <div className="left-part">
              {usersData.data.map((user) => {
                if (user.id == comment.userId) {
                  console.log(user.picture);
                  return <img src={user.picture} />;
                }
              })}
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.userName}</h3>
                </div>
                <span>{dateParser(comment.createdAt)}</span>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        );
      })}
      {userData.data.user.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Laisser un commentaire"
          />
          <br />
          <DeleteComment />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComment;
