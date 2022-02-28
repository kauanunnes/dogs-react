import React from "react";

function UserPost() {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({username, email, password})
    fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      console.log(json)
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
        type='email' 
        value={email} 
        onChange={({target}) => setEmail(target.value)}
        placeholder="type your email"
      />
      <input
        type='password' 
        value={password} 
        onChange={({target}) => setPassword(target.value)}
        placeholder="type your password"
      />
      <button>send</button>
    </form>
  )
}

export default UserPost;
