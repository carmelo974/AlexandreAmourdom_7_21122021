import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../actions/user.actions";

const DeleteProfil = () => {
  
  const userData = useSelector((state) => state.userReducer);
  const user = userData.data.user.id


  const dispatch = useDispatch();
  const deleteUser = () => dispatch(deleteAccount(user));
  
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
