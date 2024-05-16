import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function LoginPage({setUser, userList}) {

    const redirectToHomepage = useNavigate();

    const handleLoginClick =  async (clickedUser) => {
        localStorage.setItem("username", clickedUser.name)
        setUser(clickedUser)
        redirectToHomepage("/home")
    }

    useEffect(() => {
        localStorage.setItem("username", "")
        }, [])

    return (
        <>
            <h1>Hvem skal se i dag?</h1>
            <section>
                {userList?.map((user, i) => 
                <li key={i+"ronaldinho"}>
                    <button onClick={() => handleLoginClick(user)}>{user.name}</button>
                </li>)}
            </section>
        </>
    ) 
}