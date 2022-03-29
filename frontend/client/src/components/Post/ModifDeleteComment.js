import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getPosts,
  modifComment,
} from "../../actions/post.actions";

const ModifDeleteComment = (comment, postId) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);
  const [modif, setModif] = useState(false);
  const [text, setText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [controlAdmin, setControlAdmin] = useState("");

  const handleModif = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(modifComment(postId, comment.comment.id, text)).then(() =>
        dispatch(getPosts())
      );
      setText("");
      setModif(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.comment.id)).then(() =>
      dispatch(getPosts())
    );
  };

  useEffect(() => {
    const checkAdmin = () => {
      if (userData.data.user.isAdmin === true) {
        setIsAdmin(true);
      }
    };
    checkAdmin();

    const checkAuthor = () => {
      if (userData.data.user.id === comment.comment.userId) {
        setIsAuthor(true);
      }
    };

    checkAuthor();
  }, [comment.comment.userId]);

  return (
    <div className="edit-comment">
      {(isAuthor || isAdmin) && (
        <span onClick={() => setModif(!modif)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {((isAuthor && modif) || (isAdmin && modif)) && (
        <form action="" onSubmit={handleModif} className="edit-comment-form">
          {/* <label htmlFor="text" onClick={() => setModif(!modif)}>
            Modifier votre commentaire
          </label> */}
          {/* <br /> */}
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.comment.comment}
          />
          <br />
          <input type="submit" value="Valider vos modifications" />
        </form>
      )}
      <div className="btn">
        {(isAuthor || isAdmin) && (
          <span
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete();
              }
            }}
          >
            <img src="./img/icons/trash.svg" alt="delete" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ModifDeleteComment;
