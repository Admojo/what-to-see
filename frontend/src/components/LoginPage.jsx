import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchAllUsers } from '../../services/userServices';

export default function LoginPage({setUser, userList, setUserList}) {

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUserList(data)
      }
      
      useEffect(() => {
        getAllUsers()
      },[])

    // vi prøvde først med "redirect", men fikk ikke til. Derfor prøvde vi med useNavidate(). Det fungerte.
    // vi leste oss opp på useNavigate() her: https://reactrouter.com/en/main/hooks/use-navigate
    const redirectToHomepage = useNavigate();

    const handleLoginClick = (clickedUser) => {
        localStorage.setItem("username", clickedUser.name)
        setUser(clickedUser)
        redirectToHomepage("/home")
    }

    useEffect(() => {
        localStorage.clear("username")
        localStorage.clear("friend")
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