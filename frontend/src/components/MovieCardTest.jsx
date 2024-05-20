export default function MovieCardTest (index, titleSanity) {
    return (
        <> 
            <article className="movieCard">
            <img src={image === null ? "#" : image} alt="Movie Cover" />
            {/* <h3>{titleSanity}</h3> */}
            <h3><Link to={`https://m.imdb.com/title/${imdb}`}>{title}</Link></h3>
            </article>
        </>
    )
}