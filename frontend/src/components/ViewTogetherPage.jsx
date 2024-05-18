import { Link } from "react-router-dom";
import { fetchGenresForUsers, fetchWishlistForUsers, fetchFavoritesForUsers} from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 
import { getMovies } from "../App";

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
            const Wishlistdata = await fetchWishlistForUsers(user.name, friend.name);
            setUsersWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user.name, friend.name);
            setUsersFavorites(Favoritesdata);
          };
          getGeneresAndMovies()
    },[user, friend])

    useEffect(() => {
        if (usersWishlist?.sharedMovies && usersFavorites?.sharedMovies) {
            const wishlistIds = usersWishlist.sharedMovies.join(",");
            const favoritesIds = usersFavorites.sharedMovies.join(",");
            setSharedWishlistIds(wishlistIds);
            setSharedFavoritesIds(favoritesIds);
        }
    }, [usersWishlist, usersFavorites]);

    useEffect(() => {
        if (sharedWishlistIds && sharedFavoritesIds) {
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedWishlistIds}&info=base_info`;
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedFavoritesIds}&info=base_info`;
            setSharedWishlistUrl(wishlistUrl);
            setSharedFavoritesUrl(favoritesUrl);
        }
    }, [sharedWishlistIds, sharedFavoritesIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (sharedWishlistUrl && sharedFavoritesUrl) {
                const wishlist = await getMovies(sharedWishlistUrl, options);
                const favorites = await getMovies(sharedFavoritesUrl, options);
                setSharedWishlist(wishlist);
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
                    <p>Dere har {sharedWishlist?.entries} filmer felles i ønskelisten deres.</p>
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
                    <p>Dere har {sharedFavorites?.entries} filmer felles i favorittlisten deres.</p>
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