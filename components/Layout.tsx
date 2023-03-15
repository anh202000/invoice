import React from "react";
import NavBar from "./NavBar";
import Notify from "./notify/Notify";

function Layout({ children }: any) {
  return (
    <div className="container-globals">
      <div className="container mb-5">
        <NavBar />
      </div>

      <div className="container" style={{minHeight: '91.25vh'}}>
        <Notify />
        {children}
      </div>
    </div>
  );
}

export default Layout;
