import { client } from "../sanity/client"

export async function fetchWishListForUser(username) {
    
    const data = await client.fetch (`*[_type == "users" && name == "${username}"] {
        _id,
        _type,
        name,
        wishlist[]
  
    }
    `)
    return data
   
}
console.log("dataWishListUser:", fetchWishListForUser("Andrea"))