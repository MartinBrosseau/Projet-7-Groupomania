import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Profil = () => {
  const { user } = useContext(UserContext);
  const [userProfil, setUserProfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil")
      .then((res) => setUserProfil(res.data));
  });

  return (
    <div className="userProfil">
      <h3>{userProfil.username}</h3>
    </div>
  );
};

export default Profil;
