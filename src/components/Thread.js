import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Post/Card";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../feature/postsSlice";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      dispatch(setPostsData(res.data));
      setLoadPost(false);
    });
  }, [loadPost, dispatch]);

  // console.log(posts);
  // console.log(postsTrie);

  return (
    <div className="thread">
      <ul>
        {posts
          ? posts.map((post) => {
              return <Card post={post} key={post.id} />;
            })
          : ""}
      </ul>
    </div>
  );
};

export default Thread;
