import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { options } from "../App";

export default function GenrePage({genre, movielist, setMovies}){
  
    const [page, setPage] = useState(1)
    const localgenre = localStorage.getItem("genre", genre)
    const url = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre=${localgenre}&page=${page}&limit=10`;

    const getData = async(url) => {
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setMovies(result);
        } catch (error) {
          console.error(error);
        }
      }

    const handleNextClick = () => {
      setPage(prevPage => prevPage + 1)
    }

    const handlePrevClick = () => {
    setPage(prevPage => Math.max(1, prevPage - 1));
    }

    useEffect(() => {
        getData(url)
      },[page])
    
    return (
      <>
        <h1>{localgenre}</h1>
        <section id="singleGenreContent">
        {movielist?.results?.map((item, i) => 
            <MovieCard key={i+"ok"} imdb={item.id} title={item.titleText.text} image={item.primaryImage?.url}/>
        )}
        </section>
        <nav>
          <ul id="pageselector">
            <button onClick={handlePrevClick}>Forrige Side</button>
            <button onClick={handleNextClick}>Neste Side</button>
          </ul>
        </nav>
      </>
    ) 
}