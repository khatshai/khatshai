import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="mainContainer">
      <div className="resouceContainer">
      <img className="imageMargin" src="/RMtoolSVGs/CapgeminiLogoSVG.svg" alt="CapgeminiLogoSVG" />
        <p className="resourceHeading">ERnD Resource Management Tool</p>
      </div>
      <div className="resouceContainer">
      <p className="userName">My name</p>
      <img className="profileImageMargin" src="/RMtoolSVGs/Iconawesome-user-circle.svg" alt="Iconawesomeusercircle" />
      </div>
    </div>
  );
}

export default Header;
