import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post_content, setPost_content] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [image, setImage] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(userData);
  console.log(image)

  const handlePost = async () => {
    if (post_content || postPicture) {
      const data = new FormData();
      data.append("userId", userData.data.user.id);
      data.append("post_content", post_content);
      if (image) data.append("image", image);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const cancelPost = () => {
    setPost_content("");
    setPostPicture("");
    setImage("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.data.user.picure} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="post_content"
              id="post_content"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setPost_content(e.target.value)}
              value={post_content}
            />
            {post_content || postPicture ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.data.user.username}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{post_content}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/icons8-image-40.png" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="btn-send">
                {post_content || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
