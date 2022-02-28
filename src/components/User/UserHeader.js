import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom';

function UserHeader() {
  const [title, setTitle] = React.useState('')
  const location = useLocation()

  React.useEffect(() => {
    // setTitle(location.pathname)
    const {pathname} = location
    switch(pathname) {
      case '/account/analytics':
        setTitle('Analytics')
        break;
      case '/account/post':
        setTitle('Upload photo')
        break;
      default:
        setTitle('My account')
        break;
    }
  }, [location])

  return <header className={styles.header}>
    <h1 className='title'>{title}</h1>
    <UserHeaderNav />
  </header>;
}

export default UserHeader;
