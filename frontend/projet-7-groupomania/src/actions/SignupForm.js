import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../components/UserToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
  const [hasError, setError] = useState(false);
  const { setToken } = useContext(UserToken);
  const [classNames, setClassNames] = useState("form-control");
  const [passwordInfos, setPasswordInfos] = useState(false);
  const password = document.getElementById("password");
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );

  const [signupInfos, setSignupInfos] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChanges = (e) => {
    handleChange(e);
    passwordValidation();
  };

  const passwordValidation = () => {
    if (!passwordRegex.test(password.value) & (password !== null)) {
      setClassNames("form-control notValid");
    } else {
      setClassNames("form-control isValid");
    }
  };

  const handleChange = (event) => {
    setError(false);
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
        sessionStorage.setItem("token", res.data.token);
        navigate("/homepage");
      })
      .catch((err) => setError(true));
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
              className={classNames}
              type="password"
              onChange={onChanges}
              name="password"
              id="password"
              placeholder="mot de passe"
            />
          </label>
          <div className="show-infos">
            <FontAwesomeIcon
              icon={faCircleInfo}
              size="lg"
              onClick={() => setPasswordInfos(!passwordInfos)}
              className="show-infos__icon"
            />
            {passwordInfos && (
              <span className="show-infos__text">
                Votre mot de passe doit contenir au moins 8 caractères dont 1
                majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
              </span>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary btn-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Inscription
        </button>
        {hasError &&
          alert(
            "Votre adresse mail ou votre mot de passe de sont pas au format requis"
          )}
      </form>
    </div>
  );
};

export default SignupForm;
