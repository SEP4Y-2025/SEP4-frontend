import BellIcon from "../../assets/bell.svg";
import UserIcon from "../../assets/person.svg";
import { Flex } from "../../Styles/Flex";
import Icon from "./Icon";

const Settings = () => {
  const darkMode = false;
  return (
    <Flex $background="auto">
      <button className="icon-button">
        <Icon source={BellIcon} summary="Notifications" />
      </button>
      <button className="icon-button">
        <Icon source={UserIcon} summary="Profile" />
      </button>
      {/* onClick={() =>toggleTheme(false)} */}
      <Flex $dir="column" $background="auto" $gap="0.5rem">
      <div className={`theme-btn`}>
        <i className={`bi bi-sun${darkMode ? "" : "-fill"}`}></i>{" "}
      </div>
      <div className={`theme-btn `}>
        <i className={`bi bi-moon${darkMode ? "-fill" : ""}`}></i>
      </div>
      </Flex>
    </Flex>
  );
};

export default Settings;
