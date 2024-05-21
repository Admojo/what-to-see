import { useEffect, useState } from "react"
import { fetchFavoritesUser1AndWishlistUser2, fetchUser, fetchWishlistUser1AndFavoritesUser2 } from "../../services/userServices";
import { getMovies, options } from "../App";
import MovieCard from "./MovieCard";

export default function WishlistAndFavorites({user, setUser, friend, setFriend}){

    const [user1WishlistUser2Favorites, setUser1WishlistUser2Favorites] = useState(null)
    const [user1FavoritesUser2Wishlist, setUser1FavoritesUser2Wishlist] = useState(null)
    const [sharedFavWishIds, setSharedFavWishIds] = useState("")
    const [sharedWishFavIds, setSharedWishFavIds] = useState("")
    const [sharedWishlistUrl, setSharedWishlistUrl] = useState(null)
    const [sharedFavoritesUrl, setSharedFavoritesUrl] = useState(null)
    const [sharedWishlist, setSharedWishlist] = useState(null)
    const [sharedFavorites, setSharedFavorites] = useState(null)
    const [finalResult, setFinalResult] = useState({})

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
        const getResultFavAndWishlist = async () => {
            if (user != null && friend != null){
            const FavWishdata = await fetchFavoritesUser1AndWishlistUser2(user[0].name, friend[0].name);
            setUser1WishlistUser2Favorites(FavWishdata);
            // console.log("FAVWISHDATA:", FavWishdata)
            const wishFavdata = await fetchWishlistUser1AndFavoritesUser2(user[0].name, friend[0].name);
            setUser1FavoritesUser2Wishlist(wishFavdata);
            };
        }
        if(user[0] && friend[0]){
          getResultFavAndWishlist()
        }
    },[user, friend])

    useEffect(() => {
        if (user1WishlistUser2Favorites?.sharedMovies) {
            const wishlistIds = user1WishlistUser2Favorites.sharedMovies.join(",");
            setSharedFavWishIds(wishlistIds);
        }
        if (user1FavoritesUser2Wishlist?.sharedMovies){
            const favoritesIds = user1FavoritesUser2Wishlist.sharedMovies.join(",");
            setSharedWishFavIds(favoritesIds);
        }
    }, [user1WishlistUser2Favorites, user1FavoritesUser2Wishlist]);


    useEffect(() => {
        if (sharedFavWishIds) {
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedFavWishIds}&info=base_info`;
            setSharedWishlistUrl(wishlistUrl);            
        }
        if (sharedWishFavIds){
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedWishFavIds}&info=base_info`;
            setSharedFavoritesUrl(favoritesUrl);
        }
    }, [sharedFavWishIds, sharedWishFavIds]);

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

    useEffect(()=> {
        // for å legge til alle elementer fra to stykk arrayer til ett og samme array brukte jeg lenken under:
        // https://stackoverflow.com/questions/10118204/how-can-i-add-javascript-object-to-another-object-in-dynamic
        // Da fant jeg ut at jeg kunne gjøre dette: const tmp = {...sharedWishlist, ...sharedFavorites};
        const resultOfBothQueries = {...sharedWishlist, ...sharedFavorites};
        setFinalResult(resultOfBothQueries);
    },[sharedFavorites, sharedWishlist])
    // console.log("finalResult:", finalResult)

    
    return(
        <>
        <section id="wishlistAndFavoritesSection">
            <h2>ØNSKELISTER OG FAVORITTER</h2>
            {finalResult?.results ? 
            <p>Dere har noen filmer som er på ønskelisten til en av dere og favorittlisten til den andre! 
                Kanskje kan en av dere få innføre den andre i en ny filmopplevelse...?!</p>
             : <p>Dere har ingen filmer til felles fra ønskelister og favoritter.</p>}
             <ul id="ul-wishlistAndFavoritesSection">
             {finalResult?.results?.map((movie, i) =>
                            <li key={i+"davidBeckham"}>
                                <MovieCard key={i+"raymondKvisvikFFK"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
             </ul>
        </section>
        </>
    )
}