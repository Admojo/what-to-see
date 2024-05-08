import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";

export default function HomePage({user, movielist/*, title*/}){

    // En konstant som holder på alle filmer
    // const movieWishList = movielist?.docs;
    // console.log({title})

    const movieWishList = movielist;
    console.log("movielist:", movielist)
 
    return (
        <main>
            <h1>Hei, {user}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
                    <ul>
                        <li>FILM nr.1</li>
                        <li>FILM nr.2</li>
                        <li>FILM nr.3</li>
                    </ul>
                </section>
                <section id="wishlistSection">
                    <p>Disse filmene ligger i ønskelisten din:</p>
                    <ul>
                        <li>FILM nr.1</li>
                        <li>FILM nr.2</li>
                        <li>FILM nr.3</li>
                    </ul>
                    <MovieCard />
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
                <section id="watchTogetherSection">
                    <h3><VscSmiley /> Jeg skal se sammen med...</h3>
                    <ul>
                        <li>Ulrikke</li>
                        <li>Egil</li>
                    </ul>
                </section>
            </div>
        </main>
    ) 
}
