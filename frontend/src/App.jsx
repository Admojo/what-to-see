import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function App() {

// const [query,setQuery] = useState ("James Bond")

// const API_URL = ''


const url = 'https://moviesdatabase.p.rapidapi.com/titles/%7Bid%7D';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e3f288618mshec33b67b23dbf21p168ecdjsna051e3a0e1e7',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}



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
