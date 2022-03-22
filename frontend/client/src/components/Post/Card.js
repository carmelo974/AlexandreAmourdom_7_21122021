import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardComment from "./CardComment";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // modif post
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  // const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  // console.log(usersData);
  // console.log(posts.posts[1].userId);

  // console.log(post.Comments);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate)).then(()=>dispatch(getPosts()))
    } else {
      alert("entrer msg");
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(true);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
    
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            {usersData.data.map((user) => {
              if (user.id == post.userId) return <img src={user.picture} />;
            })}
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {usersData.data.map((user) => {
                    if (user.id == post.userId) return user.username;
                  })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.post_content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.post_content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modifications
                  </button>
                </div>
              </div>
            )}
            {post.post_file && (
              <img src={post.post_file} alt="card-pic" className="card-pic" />
            )}
            {userData && userData.data.user.id === post.userId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/commentaire.png"
                  alt="commentaire-pic"
                />
                {<span>{post.Comments.length}</span>}
              </div>
              <img src="./img/partager.png" alt="share-pic" />
            </div>
            {showComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
