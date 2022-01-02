import React from 'react';
import Link from 'next/link';
import { logoutUser } from '../../utils/authUser';
import { useRouter } from 'next/router';

const NavBar = ({ user }) => {

  const router = useRouter();

  const isOnFreeRoute = router.pathname === '/profiles' || router.pathname === '/profiles/[userId]'

  const authLinks = (
    <ul>
      <li>
        <Link href='/profiles'>Developers</Link>
      </li>
      <li>
        <Link href='/posts'>Posts</Link>
      </li>
      <li>
        <Link href='/dashboard'>
          Dashboard
        </Link>
      </li>
      <li>
        <a onClick={() => logoutUser(user.email, isOnFreeRoute)}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link href='/profiles'>Developers</Link>
      </li>
      <li>
        <Link href='/register'>Register</Link>
      </li>
      <li>
        <Link href='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link href='/'>
          <>
            <i className='fas fa-code'></i>DevConnector
          </>
        </Link>
      </h1>
      {user ? authLinks : guestLinks}
    </nav>
  );
};

export default NavBar;
