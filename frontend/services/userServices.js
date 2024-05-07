import { client } from "../sanity/client";

export async function fetchAllUsers(){
    const data = await client.fetch(`*[_type == "users"]{
        _id,
        _type,
        name,
    }
    `)
    return data
}