import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

import DeleteComment from "./DeleteComment";

const CardComment = ({ post }) => {
  const [comment, setComment] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commentId === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.commentId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.comment.userName}</h3>
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment}</p>
            </div>
          </div>
        );
      })}
      {userData.id && (
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
