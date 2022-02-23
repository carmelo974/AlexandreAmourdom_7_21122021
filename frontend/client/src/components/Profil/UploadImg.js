import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  console.log(file);

  const handlePicture = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", userData.data.user.username);
    data.append("userId", userData.data.user.id);
    data.append("File", file);
    dispatch(uploadPicture(data, userData.data.user.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-picture">
      <label htmlFor="file">Changer votre image</label>
      <input
        type="file"
        id="file"
        name="picture"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
