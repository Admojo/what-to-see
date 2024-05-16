import { Link, redirect } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

export default function Nav({user}) {

    const currentUser = localStorage.getItem("username");
    console.log("current user loginpage",currentUser)

    const redirectToLoginPage = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("username", "");
        redirectToLoginPage("/login")
        // for å kunne være på loginpage uten at nav-bar er synlig så må man refreshe siden først. Dette løste vi med en quickfix med linjen under.
        // fant løsningen på stackowerflow: https://stackoverflow.com/questions/41481522/how-to-refresh-a-page-using-react-route-link
        window.location.reload();
    }
    if (user !== "") {
    return(
    <nav>
        <Link to="/home" id="logoButton">What to see?</Link>
        <ul id="menyPunkter">
            <li id="pinkButtonNav">< Link to="/home"><button><FaTv /> Hva skal jeg se?</button></Link></li>
            <li><Link to ="/genre">Bla gjennom sjangere</Link></li>
            <li><FaCircleUser /> {currentUser}</li>
            <li><button id="logoutButton" onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
    )
} else {
    return(<></>)
}
}