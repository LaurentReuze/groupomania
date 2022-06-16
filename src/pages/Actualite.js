import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavMenu from "../components/NavMenu";
import NouveauPost from "../components/NouveauPost";
import Thread from "../components/Thread";
import { setUsersData } from "../feature/usersSlice";

const Actualite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      dispatch(setUsersData(res.data));
    });
  });

  return (
    <div>
      <NavMenu />
      <h1>Fil d'Actualité</h1>
      <div className="filsActualite">
        <h2>Exprimez-vous !</h2>
        <NouveauPost />
        <Thread />
      </div>
    </div>
  );
};

export default Actualite;
