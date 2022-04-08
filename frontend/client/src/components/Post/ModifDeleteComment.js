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
  console.log(props);

  const handleModif = (e) => {
    //e.preventDefault();

    if (text) {
      dispatch(modifComment(props.postId, props.comment.id, text)).then(() =>
        dispatch(getPosts())
      );
      setText("");
      setModif(true);
      props.stateComments(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(props.comment.id)).then(() => dispatch(getPosts()));
  };

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
        <form
          // action="test.php"
          //  onSubmit={handleModif}
          className="edit-comment-form"
        >
          {/* <label htmlFor="text" onClick={() => setModif(!modif)}>
            Modifier votre commentaire
          </label> */}
          {/* <br /> */}
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={props.comment.comment}
          />
          <br />

          <button type="button" onClick={handleModif}>
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
            <img src="./img/icons/trash.svg" alt="delete" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ModifDeleteComment;
