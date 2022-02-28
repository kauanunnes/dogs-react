import React from 'react';
import Input from '../Form/Input'
import Button from '../Form/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import Error from '../Helper/Error'
import styles from './UserPhotoPost.module.css'
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';

function UserPhotoPost() {
  const {data, error, loading, request} = useFetch()
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = React.useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) navigate('/account')
  }, [data, navigate])


  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem('token')
    const {url, options} = PHOTO_POST(formData, token)
    request(url, options)
  }

  function handleImgChange({target}) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    })
  }

  return (
  <section className={`${styles.photoPost} anime-left`}>
    <form onSubmit={handleSubmit}>
      <Input label='Name' type='text' name='nome' {...nome} />
      <Input label='Weight' type='number' name='peso' {...peso} />
      <Input label='Age' type='number' name='idade' {...idade} />
      <input className={styles.file} type='file' name='img' id='img' onChange={handleImgChange} />
      {loading ? (
        <Button disabled>Uploading...</Button>
      ) : (
        <Button>Upload</Button>
      )}
      {error && <Error error={error}/>}
    </form>
    <div>
      {img && <div className={styles.preview} style={{backgroundImage: `url(${img.preview})`}}></div>}
    </div>
  </section>
  )
}

export default UserPhotoPost;
