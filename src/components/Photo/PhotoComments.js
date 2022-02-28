import React from 'react';
import {UserContext} from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css'

function PhotoComments({id, single, ...props}) {
  const { login } = React.useContext(UserContext)
  const [comments, setComments] = React.useState(() => props.comments)
  const commentsSection = React.useRef()
  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight
  }, [comments])
  return (
    <>
      <ul ref={commentsSection} className={`${styles.comment} ${single ? styles.single : ''}`}>
        {comments.map(comment => <li key={comment.comment_ID}>
          <b>{comment.comment_author}:</b>
          <span>{comment.comment_content}</span>
        </li>)}
      </ul>
      {login && <PhotoCommentsForm single={single} id={id} setComments={setComments} />}
    </>
  )
}

export default PhotoComments;
