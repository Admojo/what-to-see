import { Link } from "react-router-dom";
import { fetchGenresForUsers, fetchMoviesForUsers } from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 
import { getMovies } from "../App";

export default function ViewTogetherPage({user, friend, setGenre}){

    const [sharedGenres, setSharedGenres] = useState(null)
    const [usersMovies, setUsersMovies] = useState(null)
    const [sharedMovies, setSharedMovies] = useState(null)
    const [sharedMoviesIds, setSharedMoviesIds] = useState("")
    const [sharedMoviesUrl, setSharedMoviesUrl] = useState(null)


    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    

    useEffect(() => {
        const getGeneresAndMovies = async () => {
            const genresData = await fetchGenresForUsers(user.name, friend.name);
            setSharedGenres(genresData);
            const Moviesdata = await fetchMoviesForUsers(user.name, friend.name);
            setUsersMovies(Moviesdata);
          };
          getGeneresAndMovies()
    },[user, friend])

    useEffect(() => {
        if (usersMovies?.sharedMovies) {
            const ids = usersMovies.sharedMovies.join(",");
            setSharedMoviesIds(ids);
        }
    }, [usersMovies]);

    useEffect(() => {
        if (sharedMoviesIds) {
            const url = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedMoviesIds}&info=base_info`;
            setSharedMoviesUrl(url);
        }
    }, [sharedMoviesIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (sharedMoviesUrl) {
                const movies = await getMovies(sharedMoviesUrl, options);
                setSharedMovies(movies);
            }
        };

        fetchMoviesDetails();
    }, [sharedMoviesUrl]);

    console.log("SHARED MOVIES", sharedMovies)
    console.log("URL", sharedMoviesUrl)
    return (
        <>
            <h1>Forslag for {user.name} og {friend.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2>Catch up!</h2>
                    <p>Dere har {sharedMovies?.entries} filmer felles i ønskelisten deres.</p>
                    <ul>
                        {sharedMovies?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.titleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
                    </ul>
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