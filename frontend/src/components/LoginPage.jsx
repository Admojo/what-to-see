import { useState } from "react"

export default function LoginPage({users, setLogedIn, logedIn}) {
    const [user, setUser] = useState(
        {
            username:""
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    // Tar i mot verdien provided i inputfelt og overskriver forrige 'state' med ny verdi.
    const handleChange = (event) => {
        const inputUserName = event.target.name
        const inputValue = event.target.value
        setUser((prev) => ({...prev, [inputUserName]: inputValue}))
    } 

    // Sjekker om brukernavn eksisterer i listen 'users' og setter LogedIn til true
    const handleClick = () => {
        const foundUser = users.find(element => element.username === user.username) 
        if(foundUser){
            setLogedIn(true)
            localStorage.setItem("logedIn", true)
        }
        else{
            alert("Username not found")
        }
    }
 
    return (
        <main>
            <h1>Hvem skal se i dag?</h1>
            <section>
                <h2>Velg bruker</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="username" onChange={handleChange} />
                    <button type="submit" onClick={handleClick}>Log in</button>
                </form>
            </section>
        </main>
    ) 
}