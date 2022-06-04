import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    setIsLoading(true);
  });

  console.log(post);
  if (isLoading) {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/${post.idUSER}`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data.nom);
        setUserInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <li className="card-container" key={post.id}>
      <div className="headerPost">
        <span>
          {userInfo.nom} {userInfo.prenom}
        </span>
        <h1>Test</h1>
      </div>
    </li>
  );
};

export default Card;
