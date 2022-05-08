import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import SearchAppBar from "./components/muiNav";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <SearchAppBar /> */}
      <Routes />
    </div>
  );
};

export default App;
