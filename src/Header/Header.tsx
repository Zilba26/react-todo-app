import { FC } from 'react';
import './Header.css';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <header className="Header">
    <h2>Todo App</h2>
    <i className="fa-solid fa-bell"></i>
  </header>
);

export default Header;
