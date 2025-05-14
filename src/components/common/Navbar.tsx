import React from "react";
import Logo from "../../assets/leaf2.svg"; // Adjust the path to where your logo is
import BellIcon from "../../assets/bell.svg";
import UserIcon from "../../assets/person.svg";
import { StyledNavBar } from "../../Styles/pages/NavBar.Style";
import Icon from "./Icon";
import { Flex } from "../../Styles/common/Flex";
import Settings from "./Settings";

const Navbar: React.FC = () => {
  return (
    <StyledNavBar>
      {/* Left side: Logo */}
      <Flex $background="auto">
        <Icon source={Logo} summary="Plant & GO logo" />
      </Flex>
      <Settings />
    </StyledNavBar>
  );
};

export default Navbar;
