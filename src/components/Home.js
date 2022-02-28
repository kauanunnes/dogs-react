import Feed from './Feed/Feed'
import Head from './Helper/Head'
function Home() {
  return <section className='container main-container'>
    <Head title='Photos' />
    <Feed />
  </section>;
}

export default Home;
