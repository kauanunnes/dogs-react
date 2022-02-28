import styles from './Footer.module.css'
import {ReactComponent as DogsFooter} from '../assets/dogs-footer.svg'

function Footer() {
  return <footer className={styles.footer}>
    <DogsFooter />
    <p>Dogs. Some copyrights.</p>
  </footer>;
}

export default Footer;
