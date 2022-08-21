import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../components/UserToken";

const LoginForm = () => {
  const { setToken } = useContext(UserToken);
  const [hasError, setError] = useState(false);

  let [loginInfos, setLoginInfos] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setError(false);
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
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, { ...data })
      .then(function (res) {
        setToken(res.data.token);
        sessionStorage.setItem("token", res.data.token);
        navigate("/homepage");
      })
      .catch((err) => setError(true));
  };

  return (
    <div>
      <form className="form" action="post">
        <div className="form-group">
          <label htmlFor="email">
            Adresse email
            <input
              className="form-control"
              type="email"
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="myemail@mail.com"
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
          {...() => {
            const token = handleSubmit();
            setToken(token);
          }}
        >
          Connexion
        </button>
        {hasError && alert("Veuillez vérifier vos identifiants")}
      </form>
    </div>
  );
};

export default LoginForm;
