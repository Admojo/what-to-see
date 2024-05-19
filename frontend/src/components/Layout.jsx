import Nav from "./Nav"

export default function Layout({children}){

    const currentUsername = localStorage.getItem("username")

        return(
        <> {currentUsername ? (
            <header>
                <Nav />
            </header>
        ) : (
            <header id="noNavBar">
                <Nav />
            </header>
        )}
            <main>
                {children}
            </main>
            <footer>
                <p>WhatToSee © 2024</p>
            </footer>
        </>)
}