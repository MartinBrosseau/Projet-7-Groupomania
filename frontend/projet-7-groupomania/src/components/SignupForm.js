import React from "react";
import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  let [signupInfos, setSignupInfos] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setSignupInfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = signupInfos;
    axios
      .post(`http://localhost:3000/api/auth/signup`, { ...data })
      .then((res) => {
        console.log(res);
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
