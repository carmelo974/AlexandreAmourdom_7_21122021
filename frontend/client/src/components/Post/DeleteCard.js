import React from "react";
import { useDispatch } from "react-redux";

import { deletePost, getPosts } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () =>
    dispatch(deletePost(props.id)).then(() => dispatch(getPosts()));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="poubelle" />
    </div>
  );
};

export default DeleteCard;
