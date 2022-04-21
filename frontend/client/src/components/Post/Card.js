import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardComment from "./CardComment";
import DeleteCard from "./DeleteCard";

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // modif post
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  // const setStateComments = (state) => {
  //   setShowComments(state);
  // };

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(props.post.id, textUpdate)).then(() =>
        dispatch(getPosts())
      );
    } else {
      alert("Veuillez entrer un message");
    }
    if (!userId) {
      alert("Veuillez-vous connecter ou vous inscrire");
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
  }, [usersData]);

  return (
    <li className="card-container" key={props.post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            {usersData.data.map((user, idx) => {
              if (user.id === props.post.userId)
                return <img src={user.picture} alt="user_pic" key={idx} />;
            })}
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData.data.map((user) => {
                    if (user.id === props.post.userId) return user.username;
                  })}
                </h3>
              </div>
              <span>{dateParser(props.post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{props.post.post_content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={props.post.post_content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modifications
                  </button>
                </div>
              </div>
            )}
            {!isEmpty(props.post) && props.post.post_file && (
              <img
                src={props.post.post_file}
                alt="card-pic"
                className="card-pic"
              />
            )}
            {(userData.data.user.id === props.post.userId ||
              userData.data.user.isAdmin === true) && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={props.post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/commentaire.png"
                  alt="commentaire-pic"
                />
                <span>{props.post.Comments.length}</span>
              </div>
              <img src="./img/partager.png" alt="share-pic" />
            </div>
            {showComments && (
              <CardComment
                post={props.post}
                // setShowComments={setShowComments}
              />
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
