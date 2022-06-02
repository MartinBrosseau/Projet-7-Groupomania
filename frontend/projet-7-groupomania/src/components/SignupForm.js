import React from "react";

const SignupForm = () => {
  return (
    <div>
      <form action="post" className="form">
        <label htmlFor="email">
          Adresse email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="myemail@mail.com"
          />
        </label>

        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </label>

        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default SignupForm;
