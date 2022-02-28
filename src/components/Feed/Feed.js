import React from 'react';
import FeedPhotos from './FeedPhotos';
import FeedModal from './FeedModal';
import PropTypes from 'prop-types'

function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = React.useState(null)
  const [pages, setPages] = React.useState([1])
  const [infinite, setInfinite] = React.useState(true)
  React.useEffect(() => {
    let wait = false
    const infiniteScroll = (e) => {
      if (infinite) {
        const scroll = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight
        if (scroll > height * .75 && !wait) {
          wait = true
          setPages((pages) => [...pages, pages.length + 1])
          setTimeout(() => {
            wait = false
          }, 500)
      }
      }
    }
    window.addEventListener('wheel', infiniteScroll)
    window.addEventListener('scroll', infiniteScroll)
    return () => {
      window.removeEventListener('scroll', infiniteScroll)
      window.removeEventListener('wheel', infiniteScroll)
    }
  }, [infinite])

  return <div>
    {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}  />}
    {pages.map(page => <FeedPhotos setInfinite={setInfinite} user={user} key={page} page={page} setModalPhoto={setModalPhoto} /> )}
  </div>;
}

Feed.defaultProps = {
  user: 0
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
}

export default Feed;
