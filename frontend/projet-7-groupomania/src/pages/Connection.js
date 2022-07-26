import React from "react";
import Navigation from "../components/Navigation";
import LoginForm from "../actions/LoginForm";

const Connection = () => {
  return (
    <div className="form-nav">
      <Navigation />
      <LoginForm />
    </div>
  );
};

export default Connection;
