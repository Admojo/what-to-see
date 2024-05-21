import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";

export default function Nav() {

    // vi prøvde først med "redirect", men fikk ikke til. Derfor prøvde vi med useNavidate() (Remix Software, Inc, 2024).
    const redirectToLoginPage = useNavigate();

    const handleLogout = () => {
        redirectToLoginPage("/")        
        localStorage.clear()
    }
    return(
    <nav>
        <Link to="/home" id="logoButton">What to see?</Link>
        <ul id="menyPunkter">
            <li id="pinkButtonNav">< Link to="/home"><button><FaTv /> Hva skal jeg se?</button></Link></li>
            <li><Link to ="/genres">Bla gjennom sjangere</Link></li>
            <li id="loggeduser"><FaCircleUser /> {localStorage.getItem("username")}</li>
            <li><button className="buttonBW" onClick={handleLogout}>Logg ut</button></li>
        </ul>
    </nav>
    )
}