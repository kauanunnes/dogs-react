import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'
import {ReactComponent as Dogs} from '../assets/dogs.svg'
import { UserContext } from '../UserContext';

function Header() {
  const { data } = React.useContext(UserContext)
  return <header className={styles.header}>
    <nav className={`${styles.nav} container`}>
      <Link className={styles.logo} to="/" aria-label='Dogs - Home'><Dogs /></Link>
      {data ? (
        <>
          <Link className={styles.login} to="/account">{data.email}</Link>
        </>
      ) : (
        <Link className={styles.login} to="/login">Login | Sign up</Link>
      )}
    </nav>
  </header>;
}

export default Header;