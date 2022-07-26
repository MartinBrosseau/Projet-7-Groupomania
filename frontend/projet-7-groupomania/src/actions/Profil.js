import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserToken } from "../components/UserToken";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Profil = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserToken);
  const [userProfil, setUserProfil] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const backToHomepage = () => {
    let path = "/homepage";
    navigate(path);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post/getPostsByUser", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserPosts(res.data));
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
  }, [token]);

  let [userInfos, setUserInfos] = useState({
    username: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserInfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmitProfil = (event) => {
    event.preventDefault();
    const data = userInfos;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/modifyUserProfil`,
        {
          ...data,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(function (res) {
        setUserInfos(res.data.username);
        navigate("/homepage");
      });
  };

  function deleteUser() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/auth/deleteUser`, {
        headers: { authorization: `Bearer ${token}` },
        params: { id: userProfil.id },
      })
      .then((res) => {
        navigate("/inscription");
      });
  }

  return (
    <div className="Profil">
      <div className="profil-header">
        <h3>Bonjour {userProfil.username},</h3>
        <h4>
          Sur cette page vous pouvez modifier votre pseudo,
          <br /> consulter vos posts ou même supprimer votre compte
        </h4>
      </div>

      <div className="userProfil">
        <div className="userOptions">
          <div className="modifyUser">
            <form action="post" className="form">
              <div className="form-group">
                <label htmlFor="username">
                  Nom d'utilisateur
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    id="username"
                    name="username"
                    defaultValue={userProfil.username}
                  />
                </label>
              </div>
              <button
                className="btn btn-success btn-lg"
                type="submit"
                onClick={handleSubmitProfil}
              >
                Enregistrer
              </button>
            </form>
            <button className="btn btn-primary" onClick={backToHomepage}>
              Retour
            </button>
          </div>
          <div className="deleteUser">
            <h4>
              Votre compte est enregistré avec l'addresse mail suivante : <br />
              {userProfil.email}
            </h4>
            <button
              className="btn btn-danger btn-lg"
              type="submit"
              onClick={deleteUser}
            >
              Supprimer le compte
            </button>
          </div>
        </div>

        <div className="userPosts">
          <h4>Vos posts :</h4>
          <div className="user-posts">
            {userPosts.map((post, index) => (
              <PostCard key={post.Id} post={post} user={userProfil} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
