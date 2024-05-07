//TODO: MovieCard-komponentet linker til filmens IMDB-profil
//TODO:MovieCard-komponentet viser posterbilde basert på informasjon fra API-objectet


export default function MovieCard({key, title, imdb, moviecover }) {


    return (

        <>
            <article>
                <section className="movie-card" key={key}>
                    <img src={''} alt={title}/> 
                </section>
                <section className="movie-redirect">
                    <h1> Movie title </h1>
                    <a href={`https://www.imdb.com/titles/${id}`}>{title}</a>
                </section>
            </article>
        </>

    )

    
}