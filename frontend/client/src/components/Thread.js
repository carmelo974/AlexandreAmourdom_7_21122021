import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { getUsers } from "../actions/users.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getUsers());
      dispatch(getPosts());
      setLoadPost(false); // 1 fois le store rempli, ne pas relançer cette action
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
