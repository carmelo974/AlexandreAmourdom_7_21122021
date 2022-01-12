import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    // <li className="card-container" key={post.id}>
    //   {isLoading ? <i className="fas fa-spinner fa-spin "></i> : <h2>test</h2>}
    // </li>
    <li className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(
                  usersData[0] &&
                    usersData
                      .map((user) => {
                        if (user.id === post.posterId) return user.picture;
                      })
                      .join("")
                )
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {
                    !isEmpty(
                      usersData[0] &&
                        usersData.map((user) => {
                          if (user.id === post.posterId) return user.username;
                        })
                    )
                  }
                </h3>

              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            <p>{post.post_content}</p>
            {post.post_file && (
              < img src={post.post_file} alit="card-pic" className="card-pic" />
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/commentaire.png" alt="commentaire-pic" />
                <span>{post.comments.length}</span>
              </div>
              <img src="./img/partager.png" alt="share-pic" />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
