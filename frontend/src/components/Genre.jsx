
export default function Genre() {

    // En useState som holder på staten til om en sjanger er lagt til i en brukers
    // sjangerListe (id.genreList)

    return (
        <>
            <h1>Sjangere</h1>
            <section>
                <article>
                    <ul>
                        <li><p>Sjanger</p><button> Legg til favoritt</button></li>
                        <li><p>Sjanger</p><button> Legg til favoritt</button></li>
                        <li><p>Sjanger</p><button> Legg til favoritt</button></li>
                    </ul>
                </article>
            </section>
            {/* Skrive ut liste med sjangere */}
        </>
    )
}