import React from 'react';
import { COMMENT_POST } from '../../api';
import {ReactComponent as Send} from '../../assets/enviar.svg'
import useFetch from '../../hooks/useFetch'
import styles from './PhotoCommentsForm.module.css'
import Error from '../Helper/Error'

function PhotoCommentsForm({id, setComments, single}) {
  const [comment, setComment] = React.useState('')
  const {request, error} = useFetch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const {url, options} = COMMENT_POST(id, { comment })
    const {json, response} = await request(url, options)  
    if (response.ok) {
      setComments((comments) => [...comments, json])
      setComment('')
    }
  }
  return <form onSubmit={handleSubmit} className={`${styles.form} ${single ? styles.single : ''}`}>
    <textarea className={styles.textarea} id='comment' name='comment' placeholder='Type your comment...' value={comment} onChange={({target}) => setComment(target.value)} />
    <button className={styles.button}>
      <Send />
    </button>
    {error && <Error error={error} />}
  </form>;
}

export default PhotoCommentsForm;
