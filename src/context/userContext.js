import axios from "axios";
import { createContext, useState } from "react";
import RemoveCookie from "../hooks/RemoveCookie";
import SetCookie from "../hooks/SetCookie";
import GetCookie from "../hooks/GetCookie";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [uidUser, setUidUser] = useState(GetCookie("Groupomania"));
  const [isAdmin, setisAdmin] = useState(false);
  const [postIsLoading, setPostIsLoading] = useState(false);

  const loadPost = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    });
  };

  const decodeToken = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/cookie`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data.userObj.userId);
      // console.log(res.data.userObj.isAdmin);
      setUidUser(res.data.userObj.userId);
      setisAdmin(res.data.userObj.isAdmin);
    });
  };

  const signIn = (email, password) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((res) => {
      RemoveCookie("Groupomania");
      SetCookie("Groupomania", res.data.token);
      decodeToken();
    });
  };

  return (
    <UserContext.Provider
      value={{ signIn, uidUser, isAdmin, decodeToken, postIsLoading }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
