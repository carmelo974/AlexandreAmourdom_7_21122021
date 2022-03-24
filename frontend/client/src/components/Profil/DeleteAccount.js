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

  const deleteUser = () => {
    dispatch(deleteAccount(id))
      .then(() => {
        removeLocalStorage("userId");
        removeLocalStorage("token");
      })
      .catch((err) => console.log(err));
    // window.location = "/";
  };
  return (
    <div
      onClick={() => {
        if (
          window.confirm(
            "Voulez-vous supprimer votre profil ? Cette action sera irréversible"
          )
        ) {
          deleteUser();
        }
      }}
    >
      <button>Supprimer mon profil</button>
    </div>
  );
};

export default DeleteProfil;
