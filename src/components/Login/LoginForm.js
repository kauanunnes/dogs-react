import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css'
import stylesBtn from '../Form/Button.module.css'

function LoginForm() {
  const username = useForm()
  const password = useForm()
  const { userLogin, error, loading } = React.useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return <section className='anime-left'>
    <h1 className='title'>Login</h1>
    <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
      <Input label='Username' name='username' type='text' {...username} />
      <Input label='Password' name='password' type='password' {...password} />
      {loading ? <Button disabled>Loading...</Button> : (
        <Button>login</Button>
      )}
      <Error error={error && 'Incorrect data'}/>
    </form>
    <Link className={styles.lost} to="/login/lost">Lost your password?</Link>
    <div className={styles.signUp}>
      <h2 className={styles.subtitle}>Sign Up</h2>
      <p>Still don't having an account? Sign up now.</p>
      <Link className={stylesBtn.button} to="/login/create">sign up</Link>
    </div>
  </section>;
}

export default LoginForm;
 