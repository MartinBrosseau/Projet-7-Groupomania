import { React, useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AllPosts from "../components/AllPosts";
import axios from "axios";
import { UserToken } from "../components/UserToken";

const Homepage = () => {
  const { token } = useContext(UserToken);
  const [userProfil, setUserProfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
    console.log(token);
  }, [token]);

  return (
    <div className="container-fluid">
      <h1 className="h1">
        Bienvenue {userProfil.username} ! <small>Quoi de neuf ?</small>
      </h1>

      <div className="row">
        <div className="post-creation">
          <h4>
            <NavLink to="/newpost">Nouveau post</NavLink>
          </h4>
        </div>
        <div className="profil">
          <h4>
            <NavLink to="/userprofil">Votre profil</NavLink>
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="posts">
          <AllPosts />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
