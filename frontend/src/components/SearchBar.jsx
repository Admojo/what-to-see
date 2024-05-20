import { useEffect, useState } from "react"
import { getMovies, options } from "../App";
import { useNavigate } from "react-router-dom";

export default function SearchBar({setQuery}){

    const [search, setSearch] = useState("")
    const redirectToMoviesPage = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        setQuery(search)
        redirectToMoviesPage("/movies")
    }
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    return(
        <section id="searchbar">
            <form onSubmit={handleSubmit}>
                <div id="searchinput">
                    <input id="searchfield" type="text" placeholder="Harry Potter" onChange={handleChange}></input>
                    <input id="searchbutton" type="submit" value="Søk"></input>
                </div>
            </form>
        </section>
    )
}

