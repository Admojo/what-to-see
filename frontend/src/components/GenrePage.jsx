import { useEffect } from "react";
import App from "../App";
import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";

export default function GenrePage({user, genre, movielist, setMovies}){
 
    console.log("genrepage genre", genre)
    console.log("genrepage user", user)

    const url = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre=${genre}`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

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
      },[genre])

    console.log("genrepage movielist", movielist)
    
    return (
        <section id="singleGenreContent">
        {movielist?.results?.map((item, i) => 
            <MovieCard key={i+"ok"} imdb={item.id} title={item.titleText.text} image={item.primaryImage?.url}/>
        )}
        </section>
    ) 
}