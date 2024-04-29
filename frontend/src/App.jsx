import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/home" element={<HomePage />}/>
        </Routes>
    </Layout>
  )
}

export default App 
