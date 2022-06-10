import React from "react";
import { NavLink } from "react-router-dom";
import AllPosts from "../components/AllPosts";

const Homepage = () => {
  return (
    <div className="container-fluid">
      <h1 className="h1">
        Bienvenue ! <small>Quoi de neuf ?</small>
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
