import { useState } from "react"

export default function WishlistAndFavorites(){

    const [sharedGenres, setSharedGenres] = useState(null)
    const [usersWishlist, setUsersWishlist] = useState(null)
    const [user1WishlistUser2Favorites, setUser1WishlistUser2Favorites] = useState(null)
    const [sharedWishlistIds, setSharedWishlistIds] = useState("")
    const [sharedWishlistUrl, setSharedWishlistUrl] = useState(null)
    const [usersFavorites, setUsersFavorites] = useState(null)
    const [user1FavoritesUser2Wishlist, setUser1FavoritesUser2Wishlist] = useState(null)
    const [sharedFavoritesIds, setSharedFavoritesIds] = useState("")
    const [sharedFavoritesUrl, setSharedFavoritesUrl] = useState(null)

    return(
        <>
        <section id="wishlistAndFavoritesSection">
            <h2>ØNSKELISTER OG FAVORITTER</h2>
            {user1WishlistUser2Favorites && user1FavoritesUser2Wishlist ? 
            <p>Dere har noen filmer som er på ønskelisten til en av dere og favorittlisten til den andre! 
                Kanskje kan en av dere få innføre den andre i en ny filmopplevelse...?!</p>
             : <p>Dere har ingen filmer til felles fra ønskelister og favoritter.</p>}
        </section>
        </>
    )
}