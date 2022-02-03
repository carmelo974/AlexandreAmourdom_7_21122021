import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  console.log(posts);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false); // 1 fois le store rempli, ne pas relançer cette action
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post.data.id} />;
          })}
          <Card />
      </ul>
    </div>
  );
};

export default Thread;
