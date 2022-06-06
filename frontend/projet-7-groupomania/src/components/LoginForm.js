import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//react conttext useContext
const LoginForm = () => {
  let [loginInfos, setLoginInfos] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setLoginInfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = loginInfos;
    axios
      .post(`http://localhost:3000/api/auth/login`, { ...data })
      .then(function (res) {
        if (res.status === 200) {
          navigate("/homepage");
        }
      });
  };

  return (
    <div>
      <form action="post" className="form">
        <label htmlFor="email">
          Adresse email
          <input
            type="email"
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="myemail@mail.com"
          />
        </label>

        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            onChange={handleChange}
            name="password"
            id="password"
            placeholder="password"
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Connexion
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
