import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../hooks/useFetch';
import styles from './PhotoDelete.module.css'

function PhotoDelete({id}) {
  const {loading, request} = useFetch()
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure about delete this photo?')
    if (confirm) {
      const {url, options} = PHOTO_DELETE(id)
      const {response} = await request(url, options)
      if (response.ok) {
        window.location.reload()
      }
    }
  }

  return (
    <>
      {loading ? <button disabled className={styles.delete}>Delete</button>: (
        <button onClick={handleDelete} className={styles.delete}>Delete</button>
      )}
    </>
  )
}

export default PhotoDelete;
