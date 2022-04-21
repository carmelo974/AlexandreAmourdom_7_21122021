import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState("");
  const [controlUsername, setControlUsername] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");

    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    
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
          setErrorData("Vous n'êtes pas inscrit");
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
        aria-required="true"
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
        aria-required="true"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{errorData}</div>

      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
