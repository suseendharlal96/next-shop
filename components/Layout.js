import React from "react";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ position: "relative", top: "50px" }}>{children}</div>
    </div>
  );
};

export default Layout;
