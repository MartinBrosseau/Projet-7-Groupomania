import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserToken } from "./UserToken";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const { token } = useContext(UserToken);
  const [userProfil, setUserProfil] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
    console.log(token);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = userInfos;
    axios
      .put(
        `http://localhost:3000/api/auth/modifyUserProfil`,
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

  return (
    <div className="userProfil">
      <h3>Bonjour {userProfil.username},</h3>
      <h4>
        Sur cette page vous pouvez modifier votre pseudo, consulter vos posts ou
        même supprimer votre compte
      </h4>
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
          onClick={handleSubmit}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Profil;
