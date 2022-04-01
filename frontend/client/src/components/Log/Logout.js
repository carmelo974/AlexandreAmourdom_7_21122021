import React from "react";
import axios from "axios";

const Logout = () => {
  
  const removeLocalStorage = (key) => {
    
    localStorage.removeItem(key);
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        removeLocalStorage("userId");
        removeLocalStorage("token");
      })
      .catch((err) => console.log(err));

    window.location = "/profil";
  };

  return (
    <li onClick={logout}>
      <img src="./img/logout.png" alt="logout" />
    </li>
  );
};

export default Logout;
