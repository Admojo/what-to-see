import { useState } from "react"
import Nav from "./Nav"

export default function Layout({children}){

    const [user, setUser] = useState()

    if (user == null) {
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