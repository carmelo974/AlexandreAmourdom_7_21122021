import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteAccount } from "../../actions/user.actions";

const DeleteProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const id = userData.data.user.id;

  const dispatch = useDispatch();

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  /*fonction permettant de supprimer un utilisteur et renvoie vers la page profil  */
  const deleteUser = () => {
    dispatch(deleteAccount(id))
      .then(() => {
        removeLocalStorage("userId");
        removeLocalStorage("token");
        window.location = "/profil";
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      onClick={() => {
        if (
          window.confirm(
            "Voulez-vous supprimer votre profil ? Cette action est irréversible"
          )
        ) {
          deleteUser();
        }
      }}
    >
      <button type="button">Supprimer mon profil</button>
    </div>
  );
};

export default DeleteProfil;
