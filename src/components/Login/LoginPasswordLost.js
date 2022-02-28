import React from 'react';
import Input from '../Form/Input'
import Button from '../Form/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import Error from '../Helper/Error'
import { PASSWORD_LOST } from '../../api';

function LoginPasswordLost() {
  const login = useForm()
  const {data, error, loading, request} = useFetch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (login.validate()) {
      const {url, options} = PASSWORD_LOST({ 
        login: login.value, 
        url: window.location.href.replace('lost', 'reset')
      })
      const {json, response} = await request(url, options)
    }
  }
  return <section className='anime-left'>
    <h1 className='title'>Lost your password?</h1>
    {data ? <p style={{color: '#4c1'}}>{data}</p> : (
      <form onSubmit={handleSubmit}>
        <Input label='Email/User' type='text' name='login' {...login} />
        {loading ? (
          <Button disabled>Loading....</Button>
        ) : (
          <Button>Send e-mail</Button>
        )}
        {error && <Error error={error}/>}
      </form>
    )}
  </section>;
}

export default LoginPasswordLost;
