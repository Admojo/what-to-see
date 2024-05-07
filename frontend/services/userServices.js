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

export async function fetchFavoriteGenresForUser(id) {

    const data = await client.fetch(`*[_type == "users" && id == ${id}] {
        genrelist
    }
    `)
}