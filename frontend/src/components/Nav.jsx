import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";

export default function Nav() {

    return(
    <nav>
        <Link href="#" id="logoButton">What to see?</Link>
        <ul>
            <li id="pinkButtonNav"><button><FaTv /> Hva skal jeg se?</button></li>
            <li><Link>Bla gjennom sjangere</Link></li>
            <li><Link><FaCircleUser /> USERNAME</Link></li>
        </ul>
    </nav>
    )
}