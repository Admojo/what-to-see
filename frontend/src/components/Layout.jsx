import Nav from "./Nav"

export default function Layout({children}){

    const currentUsername = localStorage.getItem("username")
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



