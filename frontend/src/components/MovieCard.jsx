//TODO: MovieCard-komponentet linker til filmens IMDB-profil
//TODO:MovieCard-komponentet viser posterbilde basert på informasjon fra API-objectet


export default function MovieCard({id, title, imdb, moviecover }) {


    return (

        <>
            <article>
                <section className="movie-card" id={id}>
                    <img src={''} alt={title}/> 
                </section>
                <section className="movie-redirect">
                    <h1> Movie title </h1>
                    <a href={`https://www.imdb.com/titles/${id}`}>{title}</a>
                </section>
                <section className="movie-redirect">
                    <h1> Movie Cover Image </h1>
                    <a href={`https://www.imdb.com/titles/${id}`}>{moviecover}</a>
                </section>
                <section className="movie-redirect">
                    <h1> Movie Cover IMDB - link </h1>
                    <a href={`https://www.imdb.com/titles/${id}`}>{imdb}</a>
                </section>
            </article>
        </>

    )

    
}