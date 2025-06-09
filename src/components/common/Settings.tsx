import BellIcon from "../../assets/bell.svg";
import UserIcon from "../../assets/person.svg";
import HomeIcon from "../../assets/home.svg";
import { Flex } from "../../Styles/common/Flex";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const darkMode = false;
  const navigate = useNavigate();
  return (
    <Flex $background="auto">
      <button onClick={() => navigate("/")}>
        <Icon source={HomeIcon} summary="My Environments" />
      </button>
      <button onClick={() => navigate("/profile")} className="profile">
        <Icon source={UserIcon} summary="Profile" />
      </button>
      {/* onClick={() =>toggleTheme(false)} */}
     
    </Flex>
  );
};

export default Settings;
