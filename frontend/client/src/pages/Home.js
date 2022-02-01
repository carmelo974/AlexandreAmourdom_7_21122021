import React from "react";
import LeftNav from "../components/LeftNav";
import Test from "../components/Post/Test";

import Thread from "../components/Thread";

const Home = () => {
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <Thread />
        <Test />
      </div>
    </div>
  );
};

export default Home;
