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

/*
import { fetchAllGenres } from "../../services/genreServices"
import { useState } from "react"

const [genreList, setGenrelist] = useState(null)

const getAllGenres = async () => {
    const data = await fetchAllGenres()
    setGenrelist(data)
}

{genreList?.map((item, i) => 
    <li key={i+"mouse"}>
        <Link to={"/sjanger/"+item.genreslug}>{item.genre}</Link>
    </li>)}
*/