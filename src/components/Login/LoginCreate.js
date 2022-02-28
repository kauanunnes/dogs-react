import React from 'react';
import Input from '../Form/Input'
import Button from '../Form/Button'
import useForm from '../../hooks/useForm'
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error'

function LoginCreate() {
  const { userLogin } = React.useContext(UserContext)
  const username = useForm()
  const email = useForm('email')
  const password = useForm()
  const {loading, error, request} = useFetch()
  
  async function handleSubmit(event) {
    event.preventDefault()
    const {url, options} = USER_POST({
      username: username.value, 
      email: email.value, 
      password: password.value
    })
    const { response, json } = await request(url, options) 
    if (!response.ok) return
    await userLogin(username.value, password.value)
  }
  return <section className='anime-left'>
    <h1 className='title'>
      Sign Up
    </h1>
      <form onSubmit={handleSubmit}>
        <Input label='Username' name='username' {...username} />
        <Input label='Email' name='email' {...email} />
        <Input label='Password' name='password' type='password' {...password} />
        {loading ? <Button disabled>Signing up...</Button> : <Button>Sign up</Button>}
        {error && <Error error={error} />}
      </form>
  </section>;
}

export default LoginCreate;
