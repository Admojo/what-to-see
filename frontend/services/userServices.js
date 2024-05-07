import { client, writeClient } from "../sanity/client";

export async function fetchAllUsers(){

    const data = await client.fetch(`*[_type == "users"] | order(name asc){
        _id,
        _type,
        name
    }
    `)

    return data
}

export async function addFavoriteGenre(users, genre, genrelist) {
    const result = await writeClient
    .patch(users)
    .setIfMissing({genrelist: []})
    .append("genrelist", [{genre: genre}])
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}