import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";

export default function Nav() {

    const redirectToLoginPage = useNavigate();

    const handleLogout = () => {
        redirectToLoginPage("/login")
        // for å kunne være på loginpage uten at nav-bar er synlig så må man refreshe siden først. Dette løste vi med en quickfix med linjen under.
        // fant løsningen på stackowerflow: https://stackoverflow.com/questions/41481522/how-to-refresh-a-page-using-react-route-link
        localStorage.clear()
    }
    return(
    <nav>
        <Link to="/home" id="logoButton">What to see?</Link>
        <ul id="menyPunkter">
            <li id="pinkButtonNav">< Link to="/home"><button><FaTv /> Hva skal jeg se?</button></Link></li>
            <li><Link to ="/genres">Bla gjennom sjangere</Link></li>
            <li><FaCircleUser /> {localStorage.getItem("username")}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
    </nav>
    )
}