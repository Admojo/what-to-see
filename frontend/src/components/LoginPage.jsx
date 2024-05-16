import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../services/userServices';
import { useEffect } from 'react';

export default function LoginPage({setUser, userList}) {

    useEffect(() => {
        localStorage.setItem("username", "")
        }, [])

    const redirectToHomepage = useNavigate();

    const handleLoginClick =  async (clickedUser) => {
        localStorage.setItem("username", clickedUser.name)
        const currentUser = await fetchUser(localStorage.getItem("username"));
        setUser(currentUser)
        redirectToHomepage("/home")
    }

    return (
        <>
            <h1>Hvem skal se i dag?</h1>
            <section>
                {userList?.map((user, i) => 
                <li key={i+"mouse"}>
                    <button onClick={() => handleLoginClick(user)}>{user.name}</button>
                </li>)}
            </section>
        </>
    ) 
}