import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/genre" element={<Genre />} />
        </Routes>
    </Layout>
  )
}

export default App 
