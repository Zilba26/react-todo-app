import { FC } from 'react';
import './Header.css';
import { BellIcon, CalendarIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <header className="Header">
    <Box id="calendarBox">
      <CalendarIcon></CalendarIcon>
    </Box>
    
    <Box id="titleBox">
      <h2>Todo App</h2>
    </Box>

    <Box id="bellBox">
      <BellIcon></BellIcon>
    </Box>
  </header>
);

export default Header;
