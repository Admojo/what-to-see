import { useEffect } from "react";
import MovieCard from "./MovieCard";
import { options } from "../App";

export default function GenrePage({user, genre, movielist, setMovies}){


    const localgenre = localStorage.getItem("genre", genre)
    console.log("genrepage GENRE@@@", localgenre)
    const url = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre=${localgenre}`;

    const getData = async(url) => {
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          console.log("result:",result);
          setMovies(result);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        getData(url)
      },[])

    
    return (
        <section id="singleGenreContent">
        {movielist?.results?.map((item, i) => 
            <MovieCard key={i+"ok"} imdb={item.id} title={item.titleText.text} image={item.primaryImage?.url}/>
        )}
        </section>
    ) 
}