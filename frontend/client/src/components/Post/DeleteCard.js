import React from "react";
import { useDispatch } from "react-redux";

import { deletePost, getPosts } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  /* fonction permettant de supprimer un post */
  const deleteQuote = () => {
    if (!userId) {
      alert("Veuillez-vous connecter ou vous inscrire");
    }
    dispatch(deletePost(props.id)).then(() => dispatch(getPosts()));
  }
    
    

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
