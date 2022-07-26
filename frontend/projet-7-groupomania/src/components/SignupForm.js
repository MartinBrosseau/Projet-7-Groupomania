import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "./UserToken";

const SignupForm = () => {
  const { token, setToken } = useContext(UserToken);

  const [signupInfos, setSignupInfos] = useState({
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
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, { ...data })
      .then(function (res) {
        setToken(res.data.token);
        console.log(token);
        navigate("/homepage");
      });
  };

  return (
    <div>
      <form className="form" action="post">
        <div className="form-group">
          <label htmlFor="username">
            Nom d'utilisateur
            <input
              className="form-control"
              type="text"
              onChange={handleChange}
              id="username"
              name="username"
              placeholder="ex: Martin"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Adresse email
            <input
              className="form-control"
              type="email"
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="ex: martin@gmail.com"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Mot de passe
            <input
              className="form-control"
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="mot de passe"
            />
          </label>
        </div>

        <button
          className="btn btn-primary btn-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Inscription
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
