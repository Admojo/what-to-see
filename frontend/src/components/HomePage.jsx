import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { fetchWishListForUser } from "../../services/movieServices";

export default function HomePage({user, movielist, userList/*, title*/}){

    // En konstant som holder på alle filmer
    // const movieWishList = movielist?.docs;
    // console.log({title})

    const otherUsers = userList.filter(friends => friends !== user)

    const movieWishList = movielist;
    console.log("movielist:", movielist)
    console.log("dataWishListUser:", fetchWishListForUser(user))
 
    return (
        <>
            <h1>Hei, {user.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
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
                    <p>Disse filmene ligger i ønskelisten din:</p>
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
                        {otherUsers?.map((user, i) => 
                        <li key={i+"mouse"}>
                            <button>{user.name}</button>
                        </li>)}
                    </ul>
                </section>
            </div>
        </>
    ) 
}
