import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route, Navigate } from 'react-router-dom';
import {useState} from 'react'

function App() {

// Holder på staten for en innlogget bruker på et overordnet nivå
// Burker localStorage og getItem
const [logedIn, setLogedIn] = useState(() => {
  const data = localStorage.getItem("logedIn")
  const logedInData = JSON.parse(data)
  return logedInData || []
})

const [users, setUser] = useState (() => {
  const data = localStorage.getItem("users")
  const usersData = JSON.parse(data)
  return usersData || []
})

console.log(users)

const databaseUsers = [
  {
    username: "andrea"
  },
  {
    username: "fredrik"

  },
  {
    username: "ole"
  },
  {
    username:"kjell-magne"
  }
]

localStorage.setItem("users", JSON.stringify(databaseUsers))
console.log(databaseUsers)


  return (
    <>
    <Layout logedIn={logedIn} setLogedIn={setLogedIn}>
    {/* <Layout> */}
      <Routes>
            <Route index element={<HomePage />}/>
            <Route path='/login' element={<LoginPage users={users} setLogedIn={setLogedIn} logedIn={logedIn} />}/>
            <Route path='/home' element={<HomePage />}/>
            <Route path='/genre' element={<Genre />} />
            {/* {!logedIn ? <Navigate to='/login' replace/> : <Navigate to='/' replace />} */}
        </Routes>
    </Layout>
    {/* {!logedIn ? <Navigate to="login" replace/> : <Navigate to="/" replace />} */}
    </>
  )
}

export default App 
