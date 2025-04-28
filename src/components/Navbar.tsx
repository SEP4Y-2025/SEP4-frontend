import React from "react";
import Logo from "../assets/leaf2.svg"; // Adjust the path to where your logo is
import BellIcon from "../assets/bell.svg";
import UserIcon from "../assets/person.svg";
import "./NavBar.css"; // Adjust the path to your CSS file

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
    {/* Left side: Logo */}
    <div className="navbar-left">
      <img src={Logo} alt="Plant & Go Logo" className="navbar-logo" />
    </div>

    {/* Right side: Icons */}
    <div className="navbar-right">
      <button className="icon-button">
        <img src={BellIcon} alt="Notifications" className="icon" />
      </button>
      <button className="icon-button">
        <img src={UserIcon} alt="Profile" className="icon" />
      </button>
    </div>
  </nav>
  );
};

export default Navbar;
