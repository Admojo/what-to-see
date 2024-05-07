import Nav from "./Nav"

export default function Layout({children, username}){

    if (username != null) {
        return(
        <div id="container">
            <header>
                <Nav></Nav>
            </header>
            <main>
                {children}
            </main>
            <footer> Copyright Gruppe 4 - 2024 </footer>
        </div>
        )
    }
    else {
        return(
            <main>
                {children}
            </main>
        )
    }
}