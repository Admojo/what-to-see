import { Link } from "react-router-dom";
import { fetchGenresForUsers, fetchWishlistForUsers, fetchFavoritesForUsers} from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 
import { getMovies, options } from "../App";
import WishlistAndFavorites from "./WishlistAndFavorites";

export default function ViewTogetherPage({user, friend, setGenre}){

    const [sharedGenres, setSharedGenres] = useState(null)
    const [usersWishlist, setUsersWishlist] = useState(null)
    const [sharedWishlist, setSharedWishlist] = useState(null)
    const [sharedWishlistIds, setSharedWishlistIds] = useState("")
    const [sharedWishlistUrl, setSharedWishlistUrl] = useState(null)
    const [usersFavorites, setUsersFavorites] = useState(null)
    const [sharedFavorites, setSharedFavorites] = useState(null)
    const [sharedFavoritesIds, setSharedFavoritesIds] = useState("")
    const [sharedFavoritesUrl, setSharedFavoritesUrl] = useState(null)
    
    useEffect(() => {
        const getGeneresAndMovies = async () => {
            const genresData = await fetchGenresForUsers(user.name, friend.name);
            setSharedGenres(genresData);
            const Wishlistdata = await fetchWishlistForUsers(user.name, friend.name);
            setUsersWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user.name, friend.name);
            setUsersFavorites(Favoritesdata);
          };
          getGeneresAndMovies()
    },[user, friend])

    useEffect(() => {
        if (usersWishlist?.sharedMovies) {
            const wishlistIds = usersWishlist.sharedMovies.join(",");
            setSharedWishlistIds(wishlistIds);
        }
        if (usersFavorites?.sharedMovies){
            const favoritesIds = usersFavorites.sharedMovies.join(",");
            setSharedFavoritesIds(favoritesIds);
        }
    }, [usersWishlist, usersFavorites]);

    useEffect(() => {
        if (sharedWishlistIds) {
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedWishlistIds}&info=base_info`;
            setSharedWishlistUrl(wishlistUrl);            
        }
        if (sharedFavoritesIds){
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedFavoritesIds}&info=base_info`;
            setSharedFavoritesUrl(favoritesUrl);
        }
    }, [sharedWishlistIds, sharedFavoritesIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (sharedWishlistUrl) {
                const wishlist = await getMovies(sharedWishlistUrl, options);
                setSharedWishlist(wishlist);
            }
            if (sharedFavoritesUrl) {
                const favorites = await getMovies(sharedFavoritesUrl, options);
                setSharedFavorites(favorites)
            }
        };

        fetchMoviesDetails();
    }, [sharedWishlistUrl, sharedFavoritesUrl]);

    console.log("SHARED Wishlist", sharedWishlist)
    console.log("SHARED Favorites", sharedFavorites)
    console.log("Wish URL", sharedWishlistUrl)
    console.log("Fav URL", sharedFavoritesUrl)
    return (
        <>
            <h1>Forslag for {user.name} og {friend.name}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2>Catch up!</h2>
                    {sharedWishlist ? <p>Dere har {sharedWishlist?.entries} filmer felles i ønskelisten deres.</p> : <p>Dere har ingen filmer til felles i ønskelisten deres.</p>}
                    <ul>
                        {sharedWishlist?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
                    </ul>
                </section>
                <section id="wishlistSection">
                    <h2>Go safe!</h2>
                    {sharedFavorites ? <p>Dere har {sharedFavorites?.entries} filmer felles i favorittlisten deres.</p> : <p>Dere har ingen filmer til felles i favorittlisten deres.</p>}
                    <ul>
                        {sharedFavorites?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"yes"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
                    </ul>
                </section>
                <section>
                    <h2>Utforsk!</h2>
                    {sharedGenres?.sharedGenres?.length > 0 ? <p>Dere liker begge disse sjangerne, sjekk hvilke filmer som finnes å velge mellom:</p> : <p>Dere har ingen sjangere til felles.</p>}
                    <ul>
                        {sharedGenres?.sharedGenres?.map((item, i) =>
                            <li key={i+"car"}>
                                <Link to="/genrepage" onClick={()=> setGenre(item)}>{item}</Link>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
            <WishlistAndFavorites/>
        </>
    ) 
}