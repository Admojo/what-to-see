import { client, writeClient } from "../sanity/client";

export async function fetchAllUsers(){
    const data = await client.fetch(`*[_type == "users"] | order(name asc){
        _id,
        _type,
        name,
        genrelist,
        wishlist,
    }
    `)
    return data
}

export async function fetchUser(username){
    const data = await client.fetch(`*[_type == "users" && name == "${username}"] {
        _id,
        _type,
        name,
        genrelist,
        wishlist,
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

export async function removeFavoriteGenre(usersid, genre) {
    // Benytter nytt document der "genre" er filtrert bort. 
    // https://stackoverflow.com/questions/37385299/filter-and-delete-filtered-elements-in-an-array
    const doc = await writeClient.getDocument(usersid);
    const newGenrelist = doc.genrelist.filter(genreElement => genreElement !== genre);
    const result = await writeClient
    .patch(usersid)
    // Vi bruker set-metoden for å erstatte den gamle arrayen med den oppdaterte arrayen som ikke inneholder "genre".
    // https://www.sanity.io/docs/http-patches#6TPENSW3
    // https://www.sanity.io/answers/understanding-how-to-add-and-modify-fields-in-sanity-documents
    .set({"genrelist": newGenrelist})
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error: " + error.message})
    return result
}

export async function fetchFavoriteGenresForUser(id) {
    const data = await client.fetch(`*[_type == "users" && _id == ${id}] {
        genrelist
    }
    `)
    return data
}

export async function fetchGenresForUsers(user1, user2) {
    const data = await client.fetch(`
        "user1genres": *[_type == "users" && name == $username1][0].genrelist,
        "user2genres": *[_type == "users" && name == $username2][0].genrelist,
        "sharedGenres": *[_type == "users" && name in [$username1, $username2]] {
          genrelist
        }[0].genrelist[(@ in *[_type == "users" && name == $username1][0].genrelist) && (@ in *[_type == "users" && name == $username2][0].genrelist)]    
    `)
    return data
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