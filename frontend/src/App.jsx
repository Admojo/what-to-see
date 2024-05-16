import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GenrePage from './components/GenrePage';
import { fetchAllUsers } from "../services/userServices"
import ViewTogetherPage from './components/ViewTogetherPage';

export async function getMovies(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("result:",result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function App() {

const [user, setUser] = useState(null)
const [friend, setFriend] = useState(null)
const [movies, setMovies] = useState (null)
const [genre, setGenre] = useState (null)
const [userList, setUserList] = useState(null)




// Endre til parameter Movie with: id, title, imdb, moviecover
// const url = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre&limit`;
// const urlSearch = `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${keyword}?info=base_info`;  URL FOR SEARCH FUNCTION
// const urlGenre = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre=${genre}`; FILM SØK PÅ SJANGER
// const urlMovies = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${user.favorites}&info=base_info`;  @@ Må % mellom id i listen @@ SØK FLERE FILMERS ID
const urlAllMovies = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
};


const getAllUsers = async () => {
  const data = await fetchAllUsers()
  setUserList(data)
  console.log("userdata:", data)
}

useEffect(() => {
  setMovies(getMovies(urlAllMovies, options))
  getAllUsers()
},[])

  return (
    <Layout user={user} setUser={setUser} userList={userList}>
      <Routes>
            <Route path="/login" element={<LoginPage userList={userList} />}/>
            <Route path="/home" element={<HomePage movielist={movies} /*title={query}*/ user={user} userList={userList} friend={friend} setFriend={setFriend} />}/>
            <Route path="/genre" element={<Genre setGenre={setGenre} user={user} genre={genre} />}/>
            <Route path="/genrepage" element={<GenrePage user={user} genre={genre} movielist={movies} setMovies={setMovies} />}/>
            <Route path="/viewtogether" element={<ViewTogetherPage user={user} friend={friend} setGenre={setGenre}/>}/>
        </Routes>
    </Layout>
    // {/* {!logedIn ? <Navigate to="login" replace/> : <Navigate to="/" replace />} */}
  
  )
}

export default App 