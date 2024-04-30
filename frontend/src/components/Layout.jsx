import Nav from "./Nav"
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";


export default function Layout({children, logedIn, setLogedIn}){
    const handleClick = ()=>{
        localStorage.setItem("logedIn", false)
        setLogedIn(false)
    }
   
    return(
    < div id="container">
        <header>
            <Nav />
            <span>
                {
                    logedIn?
                    <>
                        <Link to ="/login"><FaCircleUser /> USERNAME</Link>
                        <button onClick={handleClick}>Log out</button>
                    </>
                    : null
                }
            </span>
        </header>
        <main>
            {children}
        </main>
        {/* <footer> Copyright Gruppe 4 - 2024 </footer> */}
    </div>
    )
}