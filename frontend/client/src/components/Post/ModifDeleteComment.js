import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, getPosts, modifComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const ModifDeleteComment = (comment, postId) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [modif, setModif] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleModif = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(modifComment(postId, comment.id, text)).then(()=>dispatch(getPosts()))
      setText("");
      setModif(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(comment.id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.comment.userId]);
 

  return (
    <div className="edit-comment">
      {   //isAuthor && modif === false &&
        <span onClick={() => setModif(!modif)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      }
      {   //isAuthor && modif === false &&
        <form action="" onSubmit={handleModif} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setModif(!modif)}>
            Modifier votre commentaire
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.comment.comment}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="poubelle" />
            </span>
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      }
    </div>
  );
};

export default ModifDeleteComment;
