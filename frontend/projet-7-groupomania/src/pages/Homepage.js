import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AllPosts from "../actions/AllPosts";
import axios from "axios";
import { UserToken } from "../components/UserToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const { token } = useContext(UserToken);
  const [userProfil, setUserProfil] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/userProfil`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
  }, [token]);

  return (
    <div className="container-fluid">
      <h1 className="h1">
        Bienvenue {userProfil.username} ! <br /> <small>Quoi de neuf ?</small>
      </h1>

      <div className="row">
        <div className="post-creation">
          <h4>
            <Link to="/newpost">Nouveau post</Link>
          </h4>
        </div>
        <div className="profil">
          <div className="user-profil">
            <h4>
              <Link to="/userprofil">Votre profil</Link>
            </h4>
          </div>

          <div className="user-logout">
            <Link
              to="/connexion"
              className="user-logout__text"
              onClick={localStorage.clear()}
            >
              Se déconnecter
            </Link>
            <Link
              to="/connexion"
              className="user-logout__logo"
              onClick={localStorage.clear()}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Link>
          </div>
        </div>
      </div>

      <div className="posts-container">
        <div className="posts">
          <h3>Découvrez les derniers posts !</h3>
          <AllPosts />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
