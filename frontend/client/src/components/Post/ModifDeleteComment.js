import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getPosts,
  modifComment,
} from "../../actions/post.actions";

const ModifDeleteComment = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);
  const [modif, setModif] = useState(false);
  const [text, setText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("userId");

  /*fonction permettant de modifier un commentaire et de modifer le store */
  const handleModif = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(modifComment(props.postId, props.comment.id, text)).then(() =>
        dispatch(getPosts())
      );
      setText("");
      setModif(false);
    } else if (!userId) {
      alert("Veuillez-vous connecter ou vous inscrire");
    }
  };

  /*fonction permettant de supprimer un commentaire et le store */
  const handleDelete = () => {
    dispatch(deleteComment(props.comment.id)).then(() => dispatch(getPosts()));
    if (!userId) {
      alert("Veuillez-vous connecter ou vous inscrire");
    }
  };

  /*useEffect qui vérifie si l'utilisateur est un admin et/ou celui-ci est le propriétaire du commentaire */
  useEffect(() => {
    const checkAdmin = () => {
      if (userData.data.user.isAdmin === true) {
        setIsAdmin(true);
      }
    };
    checkAdmin();

    const checkAuthor = () => {
      if (userData.data.user.id === props.comment.userId) {
        setIsAuthor(true);
      }
    };

    checkAuthor();
  }, [props.comment.userId]);

  return (
    <div className="edit-comment">
      {(isAuthor || isAdmin) && (
        <span onClick={() => setModif(!modif)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {((isAuthor && modif) || (isAdmin && modif)) && (
        <form className="edit-comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={props.comment.comment}
          />
          <br />

          <button aria-label="modifier" type="button" onClick={handleModif}>
            Valider vos modifications
          </button>
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
            <img aria-label="supprimer" src="./img/icons/trash.svg" alt="delete" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ModifDeleteComment;
