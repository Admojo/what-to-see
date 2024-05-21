import MovieCard from "./MovieCard";

export default function MoviePage({movies, setPage, query}){

    const handleNextClick = () => {
        setPage(prevPage => prevPage + 1)
    }
  
    const handlePrevClick = () => {
      setPage(prevPage => Math.max(1, prevPage - 1));
    }

    console.log("movies", movies)
    return(
        <>  <h1>Search results for: {query}</h1>
            <section className="singleGenreContent">
            {movies?.results?.map((item, i) => 
                <MovieCard key={i+"andreaPirlo"} imdb={item.id} title={item.originalTitleText.text} image={item.primaryImage?.url}/>
            )}
            </section>
            <nav>
                <ul className="pageselector">
                    <button onClick={handlePrevClick}>Forrige Side</button>
                    <button onClick={handleNextClick}>Neste Side</button>
                </ul>
            </nav>
        </>
    )
}