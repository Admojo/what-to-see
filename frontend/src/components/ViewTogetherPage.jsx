import { Link } from "react-router-dom";
import { fetchGenresForUsers, fetchWishlistForUsers, fetchFavoritesForUsers, fetchUser} from "../../services/userServices";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react"; 
import { getMovies, options } from "../App";
import WishlistAndFavorites from "./WishlistAndFavorites";

export default function ViewTogetherPage({user, setUser, friend, setFriend, setGenre}){

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
        async function fetchUserData() {
            const currentUserName = localStorage.getItem("username");
            const currentFriendName = localStorage.getItem("friend")
            if (currentUserName){
                const currentUser = await fetchUser(currentUserName)
                setUser(currentUser)
                console.log("VIEW Curr User", currentUser[0].name)
                }
            if (currentFriendName){
                const currentFriend = await fetchUser(currentFriendName)
                setFriend(currentFriend)
                console.log("VIEW Friend User", currentFriend[0].name)
                }
            }
        fetchUserData()
    },[])

    useEffect(() => {
        const getGeneresAndMovies = async () => {
            if (user != null && friend != null){
            const genresData = await fetchGenresForUsers(user[0].name, friend[0].name);
            setSharedGenres(genresData);
            const Wishlistdata = await fetchWishlistForUsers(user[0].name, friend[0].name);
            setUsersWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user[0].name, friend[0].name);
            setUsersFavorites(Favoritesdata);
            };
        }
        if(user[0] && friend[0]){
            console.log("FRIEND", friend)
            getGeneresAndMovies()
          }
    },[friend])

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

    const handleGenreClicked = (genre) => {
        setGenre(genre)
        localStorage.setItem("genre", genre)
    }

    return (
        <>
            <h1>Forslag for {user[0]?.name} og {friend[0]?.name}</h1>
            <div>
            <section id="moviesWatchLaterSection">
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
                <section id="wishlistSection">
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
                <section id="exploresection">
                    <h2>Utforsk!</h2>
                    {sharedGenres?.sharedGenres?.length > 0 ? <p>Dere liker begge disse sjangerne, sjekk hvilke filmer som finnes å velge mellom:</p> : <p>Dere har ingen sjangere til felles.</p>}
                    <ul>
                        {sharedGenres?.sharedGenres?.map((item, i) =>
                            <li key={i+"car"}>
                                <Link to="/genrepage" onClick={()=> handleGenreClicked(item)}>{item}</Link>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
            <WishlistAndFavorites user={user} setUser={setUser} friend={friend} setFriend={setFriend}/>
        </>
    ) 
}