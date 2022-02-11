import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";
import DeleteComment from "./DeleteComment";
const Test = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false); // modif post
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch;

  const updateItem = async () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };
  
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="thread-container" key={post.id}>
      <ul>
        <div className="card-left">
          <img
            src={
              !isEmpty(usersData[0]) &&
              usersData
                .map((data) => {
                  if (data[0].id === post.userId) return data.picture;
                  else return null;
                })
                .join("")
            }
            alt="poster-pic"
          />
        </div>
        <div className="card-right">
          <div className="card-header">
            <div className="pseudo">
              <h3>
                pseudo
                {
                  !isEmpty(
                    usersData[0] &&
                      usersData.map((user) => {
                        if (user.id === post.userId) return user.username;
                        else return null;
                      })
                  )
                }
              </h3>
            </div>
            <span>{dateParser(post.createdAt)}</span>
          </div>
          {isUpdated === false && <p>{post.post_content}post</p>}
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
          {userData.id === post.userId && (
            <div className="button-container">
              <div onClick={() => setIsUpdated(true)}>
                <img src="./img/icons/edit.svg" alt="edit" />
              </div>
              <DeleteCard id={post.id} />
            </div>
          )}
          <div className="card-footer">
            <div className="comment-icon">
              <img
                onClick={() => setShowComments(!showComments)}
                src=""
                alt="commentaire-pic"
              />
              {/* <span>{posts.comments.length}</span> */}
            </div>
            <img src="" alt="share-pic" />
          </div>
          {showComments && <CardComment post={post} />}
        </div>
      </ul>
      <DeleteComment />
    </div>
  );
};

export default Test;
