import nprogress from 'nprogress';
import Router from 'next/router';
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';

function Layout({ user, children }) {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeError = () => nprogress.done();
  Router.onRouteChangeComplete = () => nprogress.done();
  return (
    <>
      <ToastContainer autoClose={2000} toastClassName="dark-toast" />
      <HeadTags />
      <Navbar user={user} />
      {children}
    </>
  );
}

export default Layout;


