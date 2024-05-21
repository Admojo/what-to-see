import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { getAllUsers } from '../App';

export default function LoginPage({setUser, userList, setUserList}) {

    const getUserList = async () => {
        const data = await getAllUsers()
        setUserList(data)
      }
      
      useEffect(() => {
        getUserList()
      },[])

    // vi prøvde først med "redirect", men fikk ikke til. Derfor prøvde vi med useNavidate() (Remix Software, Inc, 2024).
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