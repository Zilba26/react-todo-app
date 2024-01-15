import { MoonIcon } from "@chakra-ui/icons";
import { Box, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import "./Header.css";
import ShowNotif from "../ShowNotif/ShowNotif";
import { getCurrentNotifications } from "../LocalStorage";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const { toggleColorMode } = useColorMode();

  const notifications = getCurrentNotifications();

  // Filtrer les sous-tableaux qui ont exactement deux chaînes non nulles
  const validNotifications = notifications.filter(innerArray => innerArray !== null && innerArray.length === 2 && innerArray.every(str => str !== null));

  // Compter le nombre d'éléments restants
  const notificationNumber = validNotifications.length;

  return (
    <header className="Header">
      <Box id="logoBox">
        <img src={"ressource/img/logo-todo-app.png"} alt="Image" />
      </Box>

      <Box id="titleBox">
        <h2>Todo App</h2>
      </Box>

      <Box id="bellBox">
        <ShowNotif />
        <Box id="notifBox">
          <p id="numberNotif" style={{ display: notificationNumber === 0 ? 'none' : 'block' }}>{notificationNumber}</p>
        </Box>
      </Box>

      <Box id="moonBox">
        <MoonIcon onClick={toggleColorMode}></MoonIcon>
      </Box>
    </header>
  );
};

export default Header;
