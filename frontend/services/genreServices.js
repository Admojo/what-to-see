import { client } from "../sanity/client";

export async function fetchAllGenres(){
    const data = await client.fetch(`*[_type == "genre"] | order(genre asc){
        _id,
        _type,
        genre,
    }
    `)
    return data
}