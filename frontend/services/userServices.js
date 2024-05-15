import { client, writeClient } from "../sanity/client";

export async function fetchAllUsers(){

    const data = await client.fetch(`*[_type == "users"] | order(name asc){
        _id,
        _type,
        name,
        genrelist,
        wishlist,
    }
    `)

    return data
}

export async function addFavoriteGenre(usersid, genre) {
    const result = await writeClient
    .patch(usersid)
    .setIfMissing({"genrelist": []})
    .append("genrelist", [genre])
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}

export async function removeFavoriteGenre(usersid, genre) {
    const result = await writeClient
    // .patch(genre)
    // .unset(genrelist, [genre])
    // .commit()
    // .then(() => {return "Success"})
    // .catch((error) => {return "Error: " + error.message})

    .patch(usersid)
    .unset([`genrelist [genre=="${genre}"]`])
    .commit()

    return result
}

export async function fetchFavoriteGenresForUser(idInput) {

    const data = await client.fetch(`*[_type == "users" && _id == "${idInput}"] {
        genrelist
    }
    `)
    return data
}