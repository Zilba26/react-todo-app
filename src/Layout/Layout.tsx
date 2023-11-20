import React, { FC } from 'react';
import './Layout.css';
import '../all.css';
import '../all.min.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {

  return(
    <div className="root">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
