import { Link } from "react-router-dom"
import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
import { addFavoriteGenre, fetchUser, removeFavoriteGenre } from "../../services/userServices"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Genre({genre, setGenre}) {

    const currentUser = fetchUser(localStorage.getItem("username"));
    // localStorage.setItem("genre", genre)
    const [genreList, setGenrelist] = useState(currentUser.genrelist)

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
        const result = await addFavoriteGenre(currentUser._id, genre)
        console.log("result", result)
        if (result === "Success") {
            currentUser.genreList.push(genre)
        }
    }
    const handleUnFavoriteClick = (genre) => {
        //setGenre(null)
        handleClickUnfavorite(genre)
    }
    const handleClickUnfavorite = async (genre) => {
        const result = await removeFavoriteGenre(currentUser._id, genre)
    }

    const handleGenreClicked = (genre) => {
        setGenre(genre)
        localStorage.setItem("genre", genre)
    }
        

    
    return (
        <>
            <h1>Sjangere</h1>
            <section id="genreContent">
                    <ul>
                        {genreList?.map((item, i) =>
                        <li key={i+"rat"}>
                            <Link to="/genrepage" onClick={()=> handleGenreClicked(item.genre)}>{item.genre}</Link>
                            {currentUser?.genrelist?.includes(item.genre) ? (
                                <button className="removeFavoriteGenreButton" onClick={() => handleUnFavoriteClick(item.genre)}><FaStar color="orange"/> Favorittsjanger</button>
                            ) : (
                                <button className="addFavoriteGenreButton" onClick={() => handleFavoriteClick(item.genre)}><FaRegStar /> Legg til i favorittliste</button>
                            )}
                        </li>
                        )}
                    </ul>
            </section>
        </>
    )
}