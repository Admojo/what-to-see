import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";

export default function Nav() {

    return(
    <nav>
        <Link to="/home" id="logoButton">What to see?</Link>
        <ul id="menyPunkter">
            <li id="pinkButtonNav">< Link to="/home"><button><FaTv /> Hva skal jeg se?</button></Link></li>
            <li><Link to ="/genre">Bla gjennom sjangere</Link></li>
            <li><FaCircleUser /> {localStorage.getItem("username")}</li>
        </ul>
    </nav>
    )
}