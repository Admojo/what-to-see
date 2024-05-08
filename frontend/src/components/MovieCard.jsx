import { Link } from "react-router-dom";

export default function MovieCard({imdb, title, image}) {
    return (
    <article className="movieCard">
        <img src={image === null ? "#" : image} alt="Movie Cover" />
        <h3><Link to={`https://m.imdb.com/title/${imdb}`}>{title}</Link></h3>
    </article>
    )
}