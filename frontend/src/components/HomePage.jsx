import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../../services/userServices";

export default function HomePage({user, friend, setFriend, movielist, userList/*, title*/}){

    // En konstant som holder på alle filmer
    // const movieWishList = movielist?.docs;
    // console.log({title})

    const currentUser = fetchUser(localStorage.getItem("username"));

    console.log("curr usar",currentUser)

    const otherUsers = userList.filter(friends => friends.name !== currentUser)
    const redirectToViewTogetherPage = useNavigate();
    const movieWishList = movielist;
    console.log("movielist:", movielist)

    const handleFriendClick = (user) => {
        setFriend(user)
        redirectToViewTogetherPage("/viewtogether")
    }
 
    return (
        <>
            <h1>Hei, {localStorage.getItem("username")}</h1>
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
                        {otherUsers?.map((currentUser, i) => 
                        <li key={i+"mouse"}>
                            <button onClick={() => handleFriendClick(currentUser)}>{currentUser.name}</button>
                        </li>)}
                    </ul>
                </section>
            </div>
        </>
    ) 
}
