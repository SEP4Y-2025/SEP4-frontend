import React from "react";
import Logo from "../../assets/leaf2.svg"; // Adjust the path to where your logo is
import BellIcon from "../../assets/bell.svg";
import UserIcon from "../../assets/person.svg";
import { StyledNavBar } from "../../Styles/NavBar.Style";
import Icon from "./Icon";
import { Flex } from "../../Styles/Flex";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const handleIconClick =()=>{
      navigate("/")
    }
  return (
    <StyledNavBar>
      {/* Left side: Logo */}
      <Flex $background="auto">
        <Icon source={Logo} summary="Plant & GO logo" onClick={handleIconClick}/>
      </Flex>
      <Settings />
    </StyledNavBar>
  );
};

export default Navbar;
