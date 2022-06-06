import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  let [signupInfos, setSignupInfos] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSignupInfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = signupInfos;
    axios
      .post(`http://localhost:3000/api/auth/signup`, { ...data })
      .then(function (res) {
        if (res.status === 201) {
          navigate("/homepage");
        }
      });
  };

  return (
    <div>
      <form action="post" className="form">
        <label htmlFor="username">
          Nom d'utilisateur
          <input
            type="text"
            onChange={handleChange}
            id="username"
            name="username"
            placeholder="Votre username"
          />
        </label>

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
          Inscription
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
