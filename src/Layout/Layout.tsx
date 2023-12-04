import { FC } from 'react';
import './Layout.css';
import '../all.css';
import '../all.min.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {

  return(
    <div className="root">
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
