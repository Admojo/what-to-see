import Nav from "./Nav"

export default function Layout({children}){

    const currentUsername = localStorage.getItem("username")
    // fikk ikke til at logikken under fungerer. Navbar er synlig selv om bruker ikke er logget inn. 
    // Hvis knappene trykkes på når bruker ikke er logget inn, så vil dette føre til errors.
        return(
        <> {currentUsername ? (
            <header>
                <Nav />
            </header>
        ) : (
            <></>
        )}
            <main>
                {children}
            </main>
            {currentUsername ? (
            <footer>
                <p>WhatToSee © 2024</p>
            </footer>
        ) : (
            <></>
        )}
        </>)
}



