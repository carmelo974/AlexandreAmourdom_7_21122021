import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser } from "../actions/user.actions";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  // const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer);

  // dispatch(getUser())
 

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h4>Groupomania</h4>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {userData.data?.user.username} </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/login.png" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
