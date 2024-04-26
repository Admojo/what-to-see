import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
            <Route path="/" element={<LoginPage />}/>
        </Routes>
    </Layout>
  )
}

export default App 
