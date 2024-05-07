import { client } from "../sanity/client";

export async function fetchAllUsers(){
    const data = await client.fetch(`*[_type == "users"]{
        _id,
        _type,
        name,
    }
    `)
    return data
}

/*
import { fetchAllUsers } from "../../services/userServices"
import { useState, useEffect } from "react"

const [userList, setUserlist] = useState(null)

const getAllUsers = async () => {
    const data = await fetchAllUsers()
    setUserlist(data)
}

useEffect(() => {
getAllUsers
}, [])

{userList?.map((item, i) => 
    <li key={i+"mouse"}>
        {item.name}
    </li>)}
*/