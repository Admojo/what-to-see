import { Link } from "react-router-dom"
import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
import { addFavoriteGenre, fetchUser, removeFavoriteGenre } from "../../services/userServices"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Genre({user, setUser, setGenre}) {

    const [genreList, setGenrelist] = useState([])
    const [userGenreList, setUserGenreList] = useState([])
    useEffect(() => {
        async function fetchUserData() {
            const currentUserName = localStorage.getItem("username");
            if (currentUserName){
                const currentuser = await fetchUser(currentUserName)
                setUser(currentuser)
                setUserGenreList(currentuser.genrelist || [])}
            }
            fetchUserData()
    },[])

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenrelist(data)
    }
    useEffect(() => {
        getAllGenres()
        }, [])

    useEffect(() => {
        if (user){
            if (user[0])
            setUserGenreList(user[0].genrelist)
            else{setUserGenreList(user.genrelist)}
        }
    }, [user, genreList, userGenreList]);
    
    const handleFavoriteClick = (genre) => {
        setGenre(genre)
        console.log("€€€ genrelist", genreList)
        console.log("€€€ genre", genre)
        handleClick(genre)
    }
    const handleClick = async (genre) => {
        const result = await addFavoriteGenre(user[0]._id, genre)
        if (result === "Success") {
            console.log("Favorite Success")
            userGenreList.push(genre)
        }
        else{console.log("Favorite Error")}
    }
    const handleUnFavoriteClick = (genre) => {
        handleClickUnfavorite(genre)
    }
    const handleClickUnfavorite = async (genre) => {
        const result = await removeFavoriteGenre(user[0]._id, genre)
        if (result === "Success") {
            console.log("UNfavorite Success")
        }
        else{console.log("UNfavorite Error")}
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
                            {userGenreList?.includes(item.genre) ? (
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