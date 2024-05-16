import { Link } from "react-router-dom";
import { fetchGenresForUsers, fetchMoviesForUsers } from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 
import { getMovies } from "../App";

export default function ViewTogetherPage({user, friend, setGenre}){

    const [sharedGenres, setSharedGenres] = useState(null)
    const [usersMovies, setUsersMovies] = useState(null)
    const [sharedMovies, setSharedMovies] = useState(null)
    const [sharedMoviesIds, setSharedMoviesIds] = useState(null)
    const [sharedMoviesUrl, setSharedMoviesUrl] = useState(null)
    const [toggle, setToggle] = useState(false)

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    

    const getGenresForUsers = async () => {

        const data = await fetchGenresForUsers(user.name, friend.name)
        setSharedGenres(data)
      }

    
      const getMoviesForUsers = async () => {
        const data = await fetchMoviesForUsers(user.name, friend.name)
        setUsersMovies(await data)
      }

      //setSharedMoviesIds(usersMovies?.sharedMovies?.join("%"))
      //setSharedMoviesUrl(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedMoviesIds}&info=base_info`)
      
      useEffect(() => {
        getGenresForUsers()
        getMoviesForUsers()
        setToggle(true)
        console.log("URL", sharedMoviesUrl)
      },[])

      console.log("user Movies", usersMovies)
      //useEffect(()=>{
      //  setSharedMovies(getMovies(setSharedMoviesUrl, options))
      //},[toggle])

    return (
        <>
            <h1>Forslag for {user.name} og {friend.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2>Catch up!</h2>
                    <p>Dere har ANTALL filmer felles i ønskelisten deres.</p>
                    {/* <ul>
                        {sharedMovies?.sharedMovies?.map((item, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={item.id} title={item.titleText.text} image={item.primaryImage?.url}/>
                            </li>
                        )}
                    </ul> */}
                </section>
                <section id="wishlistSection">
                    <h2>Go safe!</h2>
                    <p>Dere har ANTALL filmer felles i favorittlisten deres.</p>
                    <ul>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                    </ul>
                    {/* <span className='movie-card-wrapper'>
                        {movieWishList?.map((movie, id) =>
                        <li key={id}>
                            <MovieCard key={movie?.id} 
                            title={movie?.title} 
                            imdb={movie?.imdb} 
                            moviecover={movie?.moviecover} />
                        </li>
                        )}
                    </span> */}
                </section>
                <section>
                    <h2>Utforsk!</h2>
                    <p>Dere liker begge disse sjangerne, sjekk hvilke filmer som finnes å velge mellom:</p>
                    <ul>
                        {sharedGenres?.sharedGenres?.map((item, i) =>
                            <li key={i+"car"}>
                                <Link to="/genrepage" onClick={()=> setGenre(item)}>{item}</Link>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </>
    ) 
}