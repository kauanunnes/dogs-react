import React from "react";

function TokenPost() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [token, setToken] = React.useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({username, password})
    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      console.log(json)
      setToken(json.token)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text' 
        value={username} 
        onChange={({target}) => setUsername(target.value)}
        placeholder="type your username"
      />
      <input
        type='password' 
        value={password} 
        onChange={({target}) => setPassword(target.value)}
        placeholder="type your password"
      />
      <button>send</button>
      <p>{token}</p>
    </form>
  )
}

export default TokenPost;
