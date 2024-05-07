import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";

export default function HomePage(){
 
    return (
        <main>
            <h1>Hei, USERNAME</h1>
            <div>
                <MovieCard />
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
                    <ul>
                        <li>FILM nr.1</li>
                        <li>FILM nr.2</li>
                        <li>FILM nr.3</li>
                    </ul>
                </section>
                <section id="wishlistSection">
                    <p>Disse filmene ligger i ønskelisten din:</p>
                    <ul>
                        <li>FILM nr.1</li>
                        <li>FILM nr.2</li>
                        <li>FILM nr.3</li>
                    </ul>
                </section>
                <section id="watchTogetherSection">
                    <h3><VscSmiley /> Jeg skal se sammen med...</h3>
                    <ul>
                        <li>Ulrikke</li>
                        <li>Egil</li>
                    </ul>
                </section>
            </div>
        </main>
    ) 
}