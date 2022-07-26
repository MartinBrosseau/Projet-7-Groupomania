import React from "react";
import Navigation from "../components/Navigation";
import SignupForm from "../actions/SignupForm";

const Inscription = () => {
  return (
    <div className="form-nav">
      <Navigation />
      <SignupForm />
    </div>
  );
};

export default Inscription;
