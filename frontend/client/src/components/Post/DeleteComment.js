import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post.actions";

const DeleteComment = (props) => {
  const dispatch = useDispatch();
  const handleDeleteCom = () => dispatch(deleteComment(props.id));

  return (
    <div
      className="btn"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
          handleDeleteCom();
        }
      }}
    >
      <img src="./img/icons/trash.sv" alt="poubelle" />
    </div>
  );
};

export default DeleteComment;
