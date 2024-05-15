import { useNavigate } from 'react-router-dom'

export default function LoginPage({setUser, userList}) {

    // Funnet en måte å alltid komme til homePage når en logger inn.
    // https://reactrouter.com/en/main/hooks/use-navigate
    const redirectToHomepage = useNavigate();

    const handleLoginClick = (user) => {
        setUser(user)
        redirectToHomepage("/home")
    }

console.log("users", userList)

    return (
        <main>
            <h1>Hvem skal se i dag?</h1>
            <section>
                {userList?.map((user, i) => 
                <li key={i+"mouse"}>
                    <button onClick={() => handleLoginClick(user)} >{user.name}</button>
                </li>)}
            </section>
        </main>
    ) 
}