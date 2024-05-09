import { useState, useEffect } from "react"
export default function LoginPage({setUser, userList}) {


console.log("users", userList)

    return (
        <main>
            <h1>Hvem skal se i dag?</h1>
            <h2>Velg bruker</h2>
            <section>
                {userList?.map((user, i) => 
                <li key={i+"mouse"}>
                    <button onClick={()=> setUser(user)} >{user.name}</button>
                </li>)}
            </section>
        </main>
    ) 
}