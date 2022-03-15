import React from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../actions/user.actions";

const DeleteProfil = (props) => {
  const dispatch = useDispatch();
  const deleteUser = () => dispatch(deleteAccount(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre profil ? Cette action sera irréversible")) {
          deleteUser();
        }
      }}
    >
      <button>Supprimer mon profil</button>
    </div>
  );
};

export default DeleteProfil;
