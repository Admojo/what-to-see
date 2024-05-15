import Nav from "./Nav"
import LoginPage from "./LoginPage"

export default function Layout({children, user, setUser, userList}){

    if (user != null) {
        return(
        <>
            <header>
                <Nav user={user}></Nav>
            </header>
            <main>
                {children}
            </main>
            {/* <footer> Copyright Gruppe 4 - 2024 </footer> */}
        </>
        )
    }
    else {
        return(
            <main>
                <LoginPage setUser={setUser} userList={userList}/>
            </main>
        )
    }
}