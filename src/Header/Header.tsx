import { FC } from 'react';
import './Header.css';
import { BellIcon, CalendarIcon, MoonIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {

  const {toggleColorMode} = useColorMode();

  return(
    <header className="Header">
      <Box id="logoBox">
        <img src={"ressource/img/logo-todo-app.png"} alt="Image"/>
      </Box>
      
      <Box id="titleBox">
        <h2>Todo App</h2>
      </Box>

      <Box id="bellBox">
        <BellIcon></BellIcon>
      </Box>

      <Box id="moonBox">
        <MoonIcon onClick={toggleColorMode}></MoonIcon>
      </Box>
    </header>
  );

};

export default Header;
