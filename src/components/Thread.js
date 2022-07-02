import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Post/Card";
import { UserContext } from "../context/userContext";

const Thread = () => {
  let { postIsLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      setPosts(res.data);
      postIsLoading = true;
    });
  }, [postIsLoading]);

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
