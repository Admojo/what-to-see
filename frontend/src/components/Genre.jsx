import { Link } from "react-router-dom"
import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
import { addFavoriteGenre, removeFavoriteGenre } from "../../services/userServices"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Genre({setGenre, user, genre}) {

    const [genreList, setGenrelist] = useState(user.genrelist)

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenrelist(data)
    }
    useEffect(() => {
        getAllGenres()
        }, [])
    const handleFavoriteClick = (genre) => {
        setGenre(genre)
        handleClick(genre)
    }
    const handleClick = async (genre) => {
        const result = await addFavoriteGenre(user._id, genre)
        console.log("result", result)
        if (result === "Success") {
            user.genreList.push(genre)
        }
    }
    const handleUnFavoriteClick = (genre) => {
        //setGenre(null)
        handleClickUnfavorite(genre)
    }
    const handleClickUnfavorite = async (genre) => {
        const result = await removeFavoriteGenre(user?.genrelist, genre)
        if (result === "Success") {
           user.genreList.push(genre)
        }
    }

    return (
        <>
            <h1>Sjangere</h1>
            <section id="genreContent">
                    <ul>
                        {genreList?.map((item, i) =>
                        <li key={i+"rat"}>
                            <Link to="/genrepage" onClick={()=> setGenre(item.genre)}>{item.genre}</Link>
                            {user?.genrelist?.includes(item.genre) ? (
                                <button className="removeFavoriteGenreButton" onClick={() => handleUnFavoriteClick(item.genre)}><FaStar color="orange"/> Favorittsjanger</button>
                            ) : (
                                <button className="addFavoriteGenreButton" onClick={() => handleFavoriteClick(item.genre)}><FaRegStar /> Legg til i favorittliste</button>
                            )}
                        </li>
                        )}
                    </ul>
                </article>
            </section>
            {/* Skrive ut liste med sjangere */}
        </>
    )
}