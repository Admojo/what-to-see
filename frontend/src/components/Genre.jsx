import { Link } from "react-router-dom"
import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
export default function Genre({setGenre}) {

    const [genreList, setGenrelist] = useState(null)

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenrelist(data)
    }

    useEffect(() => {
        getAllGenres()
        }, [])

    return (
        <>
            <h1>Sjangere</h1>
            <section id="genreContent">
                    <ul>
                        {genreList?.map((item, i) =>
                        <li key={i+"rat"}>
                            <Link to="/genrepage" onClick={()=> setGenre(item.genre)}>{item.genre}</Link>
                            <button>Legg til favoritt</button>
                        </li>
                        )}
                    </ul>
            </section>
            {/* Skrive ut liste med sjangere */}
        </>
    )
}