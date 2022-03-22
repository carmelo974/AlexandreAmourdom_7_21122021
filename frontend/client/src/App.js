import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import Profil from "./pages/Profil";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
// import Home from "./pages/Home"

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId === null) {
      console.log("No Id");
    } else {
      setUid(userId);
    }
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
       
    </UidContext.Provider>
  );
};

export default App;
