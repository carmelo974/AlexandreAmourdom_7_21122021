import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        {/* <Redirect to="/" /> */}
        {/* <Route path="/" element={<Navigate replace to="/home" />}></Route> */}
      </Switch>
    </Router>
  );
};

export default index;
