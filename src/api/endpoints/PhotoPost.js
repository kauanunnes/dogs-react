import React from "react";

function PhotoPost() {
  const [token, setToken] = React.useState('')
  const [name, setName] = React.useState('')
  const [peso, setPeso] = React.useState('')
  const [idade, setIdade] = React.useState('')
  const [img, setImg] = React.useState('')


  
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('img', img)
    formData.append('peso', peso)
    formData.append('idade', idade)
    formData.append('nome', name)
    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      console.log(json)
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text' 
        value={token} 
        onChange={({target}) => setToken(target.value)}
        placeholder="type your token"
      />
      <input
        type='text' 
        value={name} 
        onChange={({target}) => setName(target.value)}
        placeholder="type your name"
      />
      <input
        type='number' 
        value={idade} 
        onChange={({target}) => setIdade(target.value)}
        placeholder="type your age"
      />
      <input
        type='number' 
        value={peso} 
        onChange={({target}) => setPeso(target.value)}
        placeholder="type your weight"
      />
      

      <input
        type='file' 
        onChange={({target}) => setImg(target.files[0])}
      />
      <button>send</button>
    </form>
  )
}

export default PhotoPost;
