import { Link } from "react-router-dom";
import { fetchGenresForUsers } from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 

export default function ViewTogetherPage({user, friend, setGenre}){



    const [sharedGenres, setSharedGenres] = useState([])


    console.log("shared", sharedGenres)

    const getGenresForUsers = async () => {
        console.log("user", user.name)
        console.log("friend", friend.name)
        const data = await fetchGenresForUsers(user.name, friend.name)
        setSharedGenres(data)
      }
      
      useEffect(() => {
        getGenresForUsers()
      },[])

    return (
        <>
            <h1>Forslag for {user.name} og {friend.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2>Catch up!</h2>
                    <p>Dere har ANTALL filmer felles i ønskelisten deres.</p>
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