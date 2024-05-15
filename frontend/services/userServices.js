import { client, writeClient } from "../sanity/client";

export async function fetchAllUsers(){

    const data = await client.fetch(`*[_type == "users"] | order(name asc){
        _id,
        _type,
        name,
        genrelist,
        wishlist
    }
    `)

    return data
}

export async function addFavoriteGenre(usersid, genre) {
    const result = await writeClient
    .patch(usersid)
    .setIfMissing({"genrelist": []})
    .append("genrelist", [genre])
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}

export async function fetchFavoriteGenresForUser(id) {

    const data = await client.fetch(`*[_type == "users" && id == ${id}] {
        genrelist
    }
    `)
}


// // Hente favoritt-sjanger for to brukere
// export async function fetchFavoriteGenresForTwoUsers(userOne, userTwo) {

//     // Sende inn to user.id som input
//     const data = await client.fetch(`*[_type == "users" && id == ${userOne}] {
//         id,
//         genrelist[]->,
//         "Felles sjangere": *[_type == "users" && id == ${userTwo}].genrelist
//     }`)
// }

// TESTING: Hente favoritt-sjanger for to brukere
// export async function fetchFavoriteGenresForTwoUsersStatic() {

//     // Sende inn to user.id som input
//     const data = await client.fetch(`*[_type == "users" && name] {
//         id,
//         genrelist[]->,
//         "Felles sjangere": *[_type == "users" && id == ${userTwo}].genrelist
//     }`)
// }