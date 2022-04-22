import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import SignInForm from "../Log/SignInForm";
import SignUpForm from "../Log/SignUpForm";
import Navbar from "../Navbar";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/sign-up" exact component={SignUpForm} />
      </Switch>
    </Router>
  );
};

export default index;
