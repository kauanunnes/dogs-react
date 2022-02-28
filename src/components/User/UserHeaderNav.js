import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {ReactComponent as Feed} from '../../assets/feed.svg'
import {ReactComponent as Analytics} from '../../assets/estatisticas.svg'
import {ReactComponent as Add} from '../../assets/adicionar.svg'
import {ReactComponent as Logout} from '../../assets/sair.svg'
import styles from './UserHeaderNav.module.css'
import useMedia from '../../hooks/useMedia';

function UserHeaderNav() {
  const { userLogout } = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 40rem)')  
  const [mobileMenu, setMobileMenu] = React.useState(false)

  const {pathname} = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  return (
    <>
    {mobile && (
      <button 
        className={`${styles.mobileBtn} ${mobileMenu && styles.mobileBtnActive}`}
        aria-label='Menu' 
        onClick={() => setMobileMenu(!mobileMenu)}
      >  
      </button>
    )}
      <nav className={`${ mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to='/account' end>
          <Feed />
          {mobile && 'My photos'}
        </NavLink>
        <NavLink to='/account/analytics'>
          <Analytics />
          {mobile && 'Analytics'}
        </NavLink>
        <NavLink to='/account/post'>
          <Add />
          {mobile && 'Upload photo'}
        </NavLink>
        <button onClick={userLogout}>
          <Logout />
          {mobile && 'Logout'}
        </button>
      </nav>
    </>
  )
}

export default UserHeaderNav;
