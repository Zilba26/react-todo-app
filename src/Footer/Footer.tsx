import { FC } from 'react';
import './Footer.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="Footer">
    <p id="rights">All right reserved</p>
    <p id="names">LEBAUDY Basile - LEGENDRE Louis - LE DU Maxence</p>
  </footer>
);

export default Footer;
