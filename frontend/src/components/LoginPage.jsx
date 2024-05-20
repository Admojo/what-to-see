import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../services/userServices';

export default function LoginPage({setUser}) {

    const [userList, setUserList] = useState(null)

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUserList(data)
      }
      
      useEffect(() => {
        getAllUsers()
      },[])

    const redirectToHomepage = useNavigate();

    const handleLoginClick = (clickedUser) => {
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