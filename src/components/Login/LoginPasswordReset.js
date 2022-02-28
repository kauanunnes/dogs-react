import React from 'react';
import Input from '../Form/Input';
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import Error from '../Helper/Error'
import Button from '../Form/Button';
import { PASSWORD_RESET } from '../../api';
import { useNavigate } from 'react-router-dom';

function LoginPasswordReset() {
  const [login, setLogin] = React.useState('') 
  const [key, setKey] = React.useState('') 
  const password = useForm()
  const {error, loading, request} = useFetch()
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    if (password.validate()) {
      const {url, options} = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })
      const {response} = await request(url, options)
      if (response.ok) navigate('/login')
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')
    if (key) {
      setKey(key)
    }
    if (login) setLogin(login)
  }, [])


  return <section className='anime-left'>
    <h1 className='title'>Reset the password</h1>
    <form onSubmit={handleReset}>
      <Input type='password' name='password' label='New password' {...password}/>
      {loading ? (
          <Button disabled>Loading....</Button>
        ) : (
          <Button>Reset</Button>
        )}
        {error && <Error error={error}/>}
    </form>
  </section>
}

export default LoginPasswordReset;
