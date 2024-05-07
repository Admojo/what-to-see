import { client } from "../sanity/client";

export async function fetchAllGenres(){
    const data = await client.fetch(`*[_type == "genre"]{
        _id,
        _type,
        genre,
    }
    `)
    return data
}