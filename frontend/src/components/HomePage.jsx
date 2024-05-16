import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { fetchWishListForUser } from "../../services/movieServices";
import { useEffect, useState } from "react";

export default function HomePage({user, movielist, userList/*, title*/}){

    const [wishList, setWishList] = useState (null)

    //Skriver ut listen over brukerer som ikke er innlogget
    const otherUsers = userList.filter(friends => friends !== user)

    //Henter innhold i en ønskeliste til en bruker
    const wishListUser =  async (user) => {
        const data = await fetchWishListForUser(user.name)
        setWishList (data)
        console.log("wishListUser:", data, "username:", user.name)
    } 
    
    useEffect (() => {
        wishListUser(user)
    }, [user])

    // console.log("wishList1:", wishList)


 
    return (
        <>
            <h1>Hei, {user.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
                    {/* {wishList?.map((movie, index) => (
                        <div key={index}>
                            <p>{movie}</p> 
                        </div>
                        ))} */}
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
