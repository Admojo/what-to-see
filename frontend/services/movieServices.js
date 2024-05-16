import { client } from "../sanity/client"

// export async function fetchWishListForUser(name) {
    
//     const data = await client.fetch (`*[_type == "users" && name == ${name}] {
//       _id,
//       wishlist[name]
//     }`)
//     return data
// }

export async function fetchWishListForUser(username) {
    const query = `*[_type == "users" && name == $username] {
        wishlist
    }`
    
    const params = { username }
    const data = await client.fetch(query, params)
    return data
}

// const data = await client.fetch (`*[_type == "users" && name == "${username}"] {
//     _id,
//     _type,
//     name,
//     wishlist[]

// }
// `)
// return data

// const username = "Andrea"
// console.log("fetchWishListForUser:", fetchWishListForUser({name}))