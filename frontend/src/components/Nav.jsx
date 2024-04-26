import { Link } from "react-router-dom";

export default function Nav() {

    return(
    <nav>
        <Link href="#" id="logoButton">What to see</Link>
        <ul>
            <li id="pinkButtonNav"><button> Hva skal jeg se?</button></li>
            <li><Link>Bla gjennom sjangere</Link></li>
            <li><Link>USERNAME</Link></li>
        </ul>
    </nav>
    )
}