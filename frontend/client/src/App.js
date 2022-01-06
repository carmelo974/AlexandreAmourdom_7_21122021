import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";


const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userID');

    if (userId === null) {
      console.log('No Id');
    } else {
      setUid(userId);
      console.log(userId);
    }
  }, [uid]);
  console.log(uid);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
