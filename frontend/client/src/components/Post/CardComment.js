import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";

import { dateParser } from "../Utils";
import ModifDeleteComment from "./ModifDeleteComment";

const CardComment = (props) => {
  const [comment, setComment] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(
        addComment(props.post.id, userData.id, comment, userData.userName)
      )
        .then(() => dispatch(getPosts()))
        .then(() => setComment(""));
    } else {
      alert("Veuillez entrer un commentaire");
    }

    if (!userId) {
      alert("Veuillez-vous connecter ou vous inscrire");
    }
  };

  return (
    <div className="comments-container">
      {props.post.Comments.map((comment, idx) => {
        return (
          <div
            className={
              comment.comment.userId === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={idx}
          >
            <div className="left-part">
              {usersData.data.map((user, idx) => {
                if (user.id === comment.userId) {
                  return <img src={user.picture} alt="user_pic" key={idx} />;
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

              <ModifDeleteComment
                comment={comment}
                postId={props.post.id}
                // setShowComments={props.setShowComments}
              />
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

          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComment;
