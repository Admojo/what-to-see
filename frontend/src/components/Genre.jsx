import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
export default function Genre() {

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
                        <li key={i+"rat"}><p>{item.genre}</p><button> Legg til favoritt</button></li>
                        )}
                    </ul>
            </section>
            {/* Skrive ut liste med sjangere */}
        </>
    )
}