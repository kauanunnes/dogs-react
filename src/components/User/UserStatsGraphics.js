import React from 'react';
import styles from './UserStatsGraphics.module.css'
import { VictoryPie, VictoryChart, VictoryBar } from 'victory'

function UserStatsGraphics({data}) {
  const [graph, setGraph] = React.useState([])
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    const graphData = data.map(item => {
      return {
        x: item.title,
        y: Number(item.acessos)
      }
    })
    if (data.length > 0) {
      setTotal(data.map(({acessos}) => Number(acessos)).reduce((prev, current) => prev + current))
    }
    setGraph(graphData)
  }, [data])

  return (
    <section className={`anime-left ${styles.graph}`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
      <p>Access: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryPie 
        data={graph} 
        innerRadius={50} 
        padding={{top: 20, bottom: 20, left: 80, right: 80}} 
        style={{
          data: {
            fillOpacity: .9,
            stroke: '#fff',
            strokeWidth: 2
          },
          labels: {
            fontSize: 14,
            fill: '#333'
          }
        }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphics;
