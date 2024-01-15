import { FC } from 'react';
import './Footer.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="footer flex-center">
    <p id="rights">Tous droits réservés</p>
    <p id="names">LEBAUDY Basile - LEGENDRE Louis - LE DU Maxence</p>
  </footer>
);

export default Footer;
