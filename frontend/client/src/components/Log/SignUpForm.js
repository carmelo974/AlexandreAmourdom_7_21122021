import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [controlEmail, setControlEmail] = useState("");
  const [controlUsername, setControlUsername] = useState("");
  const [controlPass, setControlPass] = useState("");
  const [errorData, setErrorData] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";
    emailError.innerHTML = "";
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    if (username !== controlUsername) {
      usernameError.innerHTML =
        "le pseudo doit comporter entre 4 et 12 caractères";
    }

    if (email !== controlEmail) {
      emailError.innerHTML = "Vous devez entrer une adresse mail valide";
    }

    if (password !== controlPass) {
      passwordError.innerHTML =
        "Votre mot de passe doit avoir au moins 10 caractères, avec une majuscule, une minuscule et un chiffre au moins";
    }

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          username,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res);
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
        setErrorData("Veuillez remplir les champs");
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
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
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            // onClick={(e) => setControlEmail(e.target.value)}
            // value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error">{errorData}</div>
          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
