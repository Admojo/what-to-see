import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { getAllUsers, getMovies, options, getUser } from "../App";
import { fetchWishlistForUsers, fetchFavoritesForUsers, fetchAllUsers, fetchUser} from "../../services/userServices";
import SearchBar from "./SearchBar";


export default function HomePage({user, setUser, setFriend, userList, setUserList, query, setQuery}){


    // const otherUsers = userList.filter(friends => friends.name !== user.name)
    const redirectToViewTogetherPage = useNavigate();
    const [otherUsers, setOtherUsers] = useState([])
    const [userWishlist, setUserWishlist] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    const [wishlistIds, setWishlistIds] = useState("")
    const [wishlistUrl, setWishlistUrl] = useState(null)
    const [userFavorites, setUserFavorites] = useState(null)
    const [favorites, setFavorites] = useState(null)
    const [favoritesIds, setFavoritesIds] = useState("")
    const [favoritesUrl, setFavoritesUrl] = useState(null)

    useEffect(() => {
        async function fetchUserData() {
            const currentUserName = localStorage.getItem("username");
            if (currentUserName){
                const currentUser = await fetchUser(currentUserName)
                setUser(currentUser)
                //console.log("HOME Curr User", currentUser.name)
                const currentUserList = await fetchAllUsers()
                setUserList(currentUserList)
                //console.log("HOME Curr UserLIST", currentUserList)
                setOtherUsers(currentUserList.filter(friends => friends.name !== currentUser[0].name))
                //console.log("HOME Other", otherUsers)
                }
            }
        fetchUserData()
    },[])

    useEffect(() => {
        //console.log("HOME USER FUNCTION", user)
        const fetchMovies = async () => {
            if (user != null){
            //console.log("USER GETMOVIES FUNCTION @@@", user)
            const Wishlistdata = await fetchWishlistForUsers(user[0].name, user[0].name);
            setUserWishlist(Wishlistdata);
            const Favoritesdata = await fetchFavoritesForUsers(user[0].name, user[0].name);
            setUserFavorites(Favoritesdata);
            }
            else{return}
          };
          if (user[0]){
            fetchMovies()
          }
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

    const handleFriendClick = (friend) => {
        localStorage.setItem("friend", friend.name)
        setFriend(friend)
        redirectToViewTogetherPage("/viewtogether")
    }

    return (
        <>  
            <section id="topSectionHome">
                <h1>Hei, {user[0]?.name}</h1>
                <SearchBar query={query} setQuery={setQuery}/>
            </section>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Mine favoritter:</h2>
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
                    <h2> Min ønskeliste: </h2>
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
                        {otherUsers?.map((friend, i) => 
                        <li key={i+"mouse"}>
                            <button onClick={() => handleFriendClick(friend)}>{friend.name}</button>
                        </li>)}
                    </ul>
                </section>
            </div>
        </>
    ) 
}
