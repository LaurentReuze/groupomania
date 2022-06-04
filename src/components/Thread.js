import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Post/Card";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [posts, setPosts] = useState();

  useEffect(() => {
    if (loadPost) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/post/`,
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
          setLoadPost(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loadPost]);

  return (
    <div>
      <h1>Fil d'Actualité</h1>
      <ul>
        {posts.map((post) => {
          return <Card post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default Thread;
