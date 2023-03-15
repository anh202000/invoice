import React from "react";
import Link from "next/link";
// import LogoSvg from "@/public/logo";
// import SelectLogo from "@/public/selectLogo";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="mt-2">
        <Link href="/">
          <h2
            style={{
              letterSpacing: "3px"
            }}
            className="text-rainbow-animation"
          >
            Invoice
          </h2>
        </Link>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav">
          <li className="nav-item li-mr">
            <a className={"nav-link navbar-item-li"}>
              <i className="fas fa-user" aria-hidden="true"></i> Blog
            </a>
          </li>

          <li className="nav-item li-mr">
            <a className={"nav-link navbar-item-li"}>
              <i className="fas fa-user" aria-hidden="true"></i> Socials
            </a>
          </li>

          <li className="nav-item li-mr">
            <a className={"nav-link navbar-item-li"}>
              <i className="fas fa-user" aria-hidden="true"></i> Path Socials
            </a>
          </li>

          <li className="nav-item li-mr">
            <a className={"nav-link navbar-item-li"}>
              <i className="fas fa-user" aria-hidden="true"></i> Clubs
              <span> </span>
              {/* <SelectLogo /> */}
            </a>
          </li>

          <li className="nav-item li-mr">
            <a className={"nav-link navbar-item-li"}>
              <i className="fas fa-user" aria-hidden="true"></i> Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
