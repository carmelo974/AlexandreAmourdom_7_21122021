import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        let token = res.data.token;
        let userId = res.data.userId;

        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up">
      <label htmlFor="username">Pseudo</label>
      <br />
      <input
        type="text"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <div className="username error"></div>
      <label htmlFor="password">Mot de passe</label>
      <br />

      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
