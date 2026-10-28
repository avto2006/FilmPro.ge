import './App.css'
import Navbar from './Navbar'
import MovieList from './MovieList'
import Footer from './Footer'
import ChatWidget from './ChatWidget';
// import MainFilm from './MainFilm';




function App() {

  return (
    <>
      <Navbar />
      {/* <MainFilm /> */}
      <MovieList />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
