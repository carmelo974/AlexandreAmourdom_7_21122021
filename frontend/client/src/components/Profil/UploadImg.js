import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePicture = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", userData.data.user.username);
    data.append("userId", userData.data.user.id);
    data.append("image", file);

    console.log(data);
    console.log(userData.data.user.id);
    dispatch(uploadPicture(data, userData.data.user.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-picture">
      <label htmlFor="file">Changer votre image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        
        onChange={onFileChange}
      />
      <br />
      <input type="submit" value="Envoyer" onClick={handlePicture} />
    </form>
  );
};

export default UploadImg;
