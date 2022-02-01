import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";

const Test = (posts) => {
 

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false); // modif post
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch = useDispatch;

  const updateItem = async () => {
    if (textUpdate) {
        dispatch(updatePost(posts.id, textUpdate));
      }
      setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="thread-container">
      <ul>
        <div className="card-left">
          <img
            src={
              !isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user.id === posts.userId) return user.picture;
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
                        if (user.id === posts.userId) return user.username;
                        else return null;
                      })
                  )
                }
              </h3>
            </div>
            <span>{dateParser(posts.createdAt)}</span>
          </div>
          {isUpdated === false && <p>{posts.post_content}post</p>}
          {isUpdated && (
            <div className="update-post">
              <textarea
                defaultValue={posts.post_content}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
              <div className="button-container">
                <button className="btn" onClick={updateItem}>
                  Valider modifications
                </button>
              </div>
            </div>
          )}
          {posts.post_file && (
            <img src={posts.post_file} alt="card-pic" className="card-pic" />
          )}
          {userData.id === posts.userId && (
            <div className="button-container">
              <div onClick={() => setIsUpdated(true)}>
                <img src="./img/icons/edit.svg" alt="edit" />
              </div>
            </div>
          )}
          <div className="card-footer">
            <div className="comment-icon">
              <img src="" alt="commentaire-pic" />
              {/* <span>{posts.comments.length}</span> */}
            </div>
            <img src="" alt="share-pic" />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Test;
