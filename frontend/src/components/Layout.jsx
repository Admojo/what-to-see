import Nav from "./Nav"
import LoginPage from "./LoginPage"

export default function Layout({children, user, setUser, userList}){

    console.log("Userlist LAYOUT::::", userList)
    if (localStorage.getItem("username") != null) {
        return(
        <>
            <header>
                <Nav/>
            </header>
            <main>
                {children}
            </main>
        </>
        )
    }
    else {
        return(
            <main>
                {<LoginPage setUser={setUser} userList={userList}/>}
            </main>
        )
    }
}