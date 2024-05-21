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

    // console.log("user1FavoritesUser2Wishlist",user1FavoritesUser2Wishlist)
    // console.log("user1WishlistUser2Favorites",user1WishlistUser2Favorites)

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


   // Funksjon for å skrive ut data om hvilken bruker og hvilken liste et element er gjenstand i: 
    const getMovieItemSource = async(user, friend) => {
        const FavWishdata = await fetchFavoritesUser1AndWishlistUser2(user[0].name, friend[0].name)
            
            const user1Wishlist = user[0].wishlist
            const user1Favlist = user[0].favorites

            const user2Wishlist = friend[0].wishlist
            const user2Favlist = friend[0].favorites

          
            user1Wishlist.forEach(movie => {
                if (FavWishdata.find(movie)) {
                    console.log(`Hurra! Movie: ${movie}, User: ${user[0].name}`);
                }
            });

            // if ((FavWishdata[0] === user1Wishlist[0]) =>
            //     console.log("hurra ")
            // )

        console.log("user1favlist", user1Favlist, "user1Wishlist", user1Wishlist)
        console.log("user2favlist", user2Favlist, "user2Wishlist", user2Wishlist)

    }
    // console.log("user", user, "friend", friend)
    console.log("getMovieItemsource:", getMovieItemSource(user, friend))

    
   
//    // Funksjon for å skrive ut data om hvilken bruker og hvilken liste et element er gjenstand i: 
//    const getMovieItemSource = async(user, friend) => {
//     const FavWishdata = await fetchFavoritesUser1AndWishlistUser2(user[0].name, friend[0].name)
        
//         const user1Wishlist = user[0].wishlist
//         const user1Favlist = user[0].favorites

//         const user2Wishlist = friend[0].wishlist
//         const user2Favlist = friend[0].favorites

//     console.log("user1favlist", user1Favlist, "user1Wishlist", user1Wishlist)

    

//     // const user1List = FavWishdata.user1movies
//     // const user2List = FavWishdata.user2movies
    

    
//     // console.log("FAVWISHDATA:", FavWishdata)

//     // console.log("FAVWISHDATA-shared movies:", FavWishdata.sharedMovies)
//     // console.log("FAVWISHDATA-user1:", FavWishdata.user1movies)
//     // console.log("FAVWISHDATA-user2:", FavWishdata.user2movies)

//     // console.log ("userwishlist:", user[0])
//     // console.log ("friendwishlist:", friend[0].wishlist)


//     // const friendFavList = friend.FavWishdata
// }

    
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
                                <section>
                                    <p> filmen tilhører bruker  </p>
                                    <p> filmen ligger i liste </p>
                                </section>
                                <MovieCard key={i+"raymondKvisvikFFK"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
             </ul>
        </section>
        </>
    )
}