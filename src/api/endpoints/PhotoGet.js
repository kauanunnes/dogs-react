
function PhotoGet() {
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://dogsapi.origamid.dev/json/api/photo/14702')
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      console.log(json)
    })
  }
  return <form onSubmit={handleSubmit}>
    <input type='text'/>
    <button>search</button>
  </form>;
}

export default PhotoGet;
