import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { getMovies } from "../App";
import { Link } from "react-router-dom";
import { fetchWishlistForUsers, fetchFavoritesForUsers} from "../../services/userServices";


export default function HomePage({user, friend, setFriend, movielist, userList/*, title*/}){

    // En konstant som holder på alle filmer
    // const movieWishList = movielist?.docs;
    // console.log({title})

    const otherUsers = userList.filter(friends => friends !== user)
    const redirectToViewTogetherPage = useNavigate();
    const movieWishList = movielist;
    const [userWishlist, setUserWishlist] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    const [wishlistIds, setWishlistIds] = useState("")
    const [wishlistUrl, setWishlistUrl] = useState(null)
    const [userFavorites, setUserFavorites] = useState(null)
    const [favorites, setFavorites] = useState(null)
    const [favoritesIds, setFavoritesIds] = useState("")
    const [favoritesUrl, setFavoritesUrl] = useState(null)

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const getMovies = async () => {
            const Wishlistdata = await fetchWishlistForUsers(user.name, user.name);
            setUserWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user.name, user.name);
            setUserFavorites(Favoritesdata);
          };
          getMovies()
    },[user])

    useEffect(() => {
        if (userWishlist?.user1movies && userFavorites?.user1movies) {
            const wishlistIds = userWishlist.user1movies.join(",");
            const favoritesIds = userFavorites.user1movies.join(",");
            setWishlistIds(wishlistIds);
            setFavoritesIds(favoritesIds);
        }
    }, [userWishlist, userFavorites]);

    useEffect(() => {
        if (wishlistIds && favoritesIds){
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${wishlistIds}&info=base_info`;
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${favoritesIds}&info=base_info`;
            setWishlistUrl(wishlistUrl);
            setFavoritesUrl(favoritesUrl);
        }
    }, [wishlistIds, favoritesIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (wishlistUrl && favoritesUrl) {
                const wishlist = await getMovies(wishlistUrl, options);
                const favorites = await getMovies(favoritesUrl, options);
                setWishlist(wishlist);
                setFavorites(favorites)
            }
        };

        fetchMoviesDetails();
    }, [wishlistUrl, favoritesUrl]);

    const handleFriendClick = (user) => {
        setFriend(user)
        redirectToViewTogetherPage("/viewtogether")
    }
 
    return (
        <>
            <h1>Hei, {user.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
                    <ul>
                        {favorites?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
                    </ul>
                </section>
                <section id="wishlistSection">
                    <p>Disse filmene ligger i ønskelisten din:</p>
                    <ul>
                        {wishlist?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
                    </ul>
                </section>
                <section id="watchTogetherSection">
                    <h3><VscSmiley /> Jeg skal se sammen med...</h3>
                    <ul>
                        {otherUsers?.map((user, i) => 
                        <li key={i+"mouse"}>
                            <button onClick={() => handleFriendClick(user)}>{user.name}</button>
                        </li>)}
                    </ul>
                </section>
            </div>
        </>
    ) 
}
