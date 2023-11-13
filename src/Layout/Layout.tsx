import React, { FC } from 'react';
import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCookies } from 'react-cookie';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  return(
    <div className="root">
      <Header />
      <main>
        <button onClick={() => setCookie('cookie-name', 'cookie-value')}>Set cookie</button>
        <button onClick={() => removeCookie('cookie-name')}>Remove cookie</button>
        <p>Cookie: {cookies['cookie-name']}</p>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
