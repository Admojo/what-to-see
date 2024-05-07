import { fetchAllUsers } from "../../services/userServices"
import { useState, useEffect } from "react"
export default function LoginPage() {

const [userList, setUserList] = useState(null)
const [user, setUser] = useState(null)

const getAllUsers = async () => {
    const data = await fetchAllUsers()
    setUserList(data)
}

useEffect(() => {
getAllUsers()
}, [])

console.log("users", userList)

    return (
        <main>
            <h1>Hvem skal se i dag?</h1>
            <h2>Velg bruker</h2>
            <section>
                {userList?.map((item, i) => 
                <li key={i+"mouse"}>
                    <button>{item.name}</button>
                </li>)}
            </section>
        </main>
    ) 
}