import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { getMovies, options } from "../App";
import { fetchWishlistForUsers, fetchFavoritesForUsers} from "../../services/userServices";


export default function HomePage({user, setFriend, userList}){

    const otherUsers = userList.filter(friends => friends.name !== user.name)
    const redirectToViewTogetherPage = useNavigate();
    const [userWishlist, setUserWishlist] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    const [wishlistIds, setWishlistIds] = useState("")
    const [wishlistUrl, setWishlistUrl] = useState(null)
    const [userFavorites, setUserFavorites] = useState(null)
    const [favorites, setFavorites] = useState(null)
    const [favoritesIds, setFavoritesIds] = useState("")
    const [favoritesUrl, setFavoritesUrl] = useState(null)

    useEffect(() => {
        const getMovies = async () => {
            if (user !== null){
            const Wishlistdata = await fetchWishlistForUsers(user.name, user.name);
            setUserWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user.name, user.name);
            setUserFavorites(Favoritesdata);
            }
            else{return}
          };
          getMovies()
    },[user])

    useEffect(() => {
        if (userWishlist?.user1movies) {
            const wishlistIds = userWishlist.user1movies.join(",");
            setWishlistIds(wishlistIds);
        }
        if (userFavorites?.user1movies){
            const favoritesIds = userFavorites.user1movies.join(",");
            setFavoritesIds(favoritesIds);
        }
    }, [userWishlist, userFavorites]);

    useEffect(() => {
        if (wishlistIds){
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${wishlistIds}&info=base_info`;
            setWishlistUrl(wishlistUrl);
        }
        if (favoritesIds){
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${favoritesIds}&info=base_info`;
            setFavoritesUrl(favoritesUrl);
        }
    }, [wishlistIds, favoritesIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (wishlistUrl) {
                const wishlist = await getMovies(wishlistUrl, options);
                setWishlist(wishlist);
            }
            if (favoritesUrl) {
                const favorites = await getMovies(favoritesUrl, options);
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
                        {favorites?.results ?
                        favorites?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        ) : <li>Du har ingen filmer i "filmer jeg skal se" listen</li>}
                    </ul>
                </section>
                <section id="wishlistSection">
                    <h2> Filmer i min ønskeliste </h2>
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
