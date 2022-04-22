import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import DeleteAccount from "./DeleteAccount";

const UpdateProfil = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const [bio, setBio] = useState(userData.data?.user.bio);

  /*fonction permettant de modifier la bio de l'utilisateur */
  const handleUpdate = () => {
    dispatch(updateBio(userData.data.user.id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.data?.user.username}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img
            src={userData.data.user.picture || "./img/user.png"}
            alt="user-pic"
          />

          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier votre bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.data.user.createdAt)}</h4>
        </div>
      </div>
      <br />
      <DeleteAccount />
    </div>
  );
};

export default UpdateProfil;
