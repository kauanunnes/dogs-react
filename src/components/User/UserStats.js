import React from 'react';
import { STATS_GET } from '../../api';
import useFetch from '../../hooks/useFetch'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
// import UserStatsGraphics from './UserStatsGraphics';

const UserStatsGraphics = React.lazy(() => import('./UserStatsGraphics'))

function UserStats() {
  const {data, error, loading, request} = useFetch()

  React.useEffect(() => {
    const getData = async () => {
      const {url, options} = STATS_GET()
      await request(url, options)
    }
    getData()
  }, [request])
  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data) return (
    <React.Suspense fallback={<></>}>
      <UserStatsGraphics data={data}/>
    </React.Suspense>
  )
  else return null
}

export default UserStats;
