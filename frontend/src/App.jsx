import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(null)

  return (
    <Layout user={user} setUser={setUser}>
      <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/home" element={<HomePage user={user}/>}/>
            <Route path="/genre" element={<Genre />} />
        </Routes>
    </Layout>
  )
}

export default App 