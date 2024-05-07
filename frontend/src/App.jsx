import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {

const [query, setQuery] = useState ("")
const [movies, setMovies] = useState ("James Bond")
const [genre, setGenre] = useState ("action")


// Endre til parameter Movie with: id, title, imdb, moviecover
const url = `https://moviesdatabase.p.rapidapi.com/titles/titles?info=base_info&genre=${genre}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e3f288618mshec33b67b23dbf21p168ecdjsna051e3a0e1e7',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

const getData = async(url) => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    setMovies(result);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getData(url)
},[])

console.log("movies", movies)

  return (
    <Layout>
      <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/home" element={<HomePage movielist={movies} title={query} />}/>
            <Route path="/genre" element={<Genre />} />
        </Routes>
    </Layout>
  )
}

export default App 
