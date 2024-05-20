import { client, writeClient } from "../sanity/client";

export async function fetchAllUsers(){
    const data = await client.fetch(`*[_type == "users"] | order(name asc){
        _id,
        _type,
        name,
        genrelist,
        wishlist,
        favorites
    }
    `)
    return data
}

export async function fetchUser(username){
    const data = await client.fetch(`*[_type == "users" && name == ${username}] {
        _id,
        _type,
        name,
        genrelist,
        wishlist,
        favorites
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
    const doc = await writeClient.getDocument(usersid);
    const newGenrelist = doc.genrelist.filter(genreElement => genreElement !== genre);
    // Benytter nytt document som ikke inneholder "genre" i "newGenrelist". Bruker .set-metoden for å legge inn den nye arrayen.
    // https://www.sanity.io/docs/http-patches#6TPENSW3
    const result = await writeClient
    .patch(usersid)
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
    const query = `{
        "user1genres": *[_type == "users" && name == $user1][0].genrelist,
        "user2genres": *[_type == "users" && name == $user2][0].genrelist,
        "sharedGenres": *[_type == "users" && name in [$user1, $user2]] {
          genrelist
        }[0].genrelist[(@ in *[_type == "users" && name == $user1][0].genrelist) && (@ in *[_type == "users" && name == $user2][0].genrelist)]    
    }`;

    const params = { user1, user2 };
    const data = await client.fetch(query, params)
    return data
}

export async function fetchWishlistForUsers(user1, user2) {
    const query = `{
        "user1movies": *[_type == "users" && name == $user1][0].wishlist,
        "user2movies": *[_type == "users" && name == $user2][0].wishlist,
        "sharedMovies": *[_type == "users" && name in [$user1, $user2]] {
            wishlist
        }[0].wishlist[(@ in *[_type == "users" && name == $user1][0].wishlist) && (@ in *[_type == "users" && name == $user2][0].wishlist)]    
    }`;

    const params = { user1, user2};
    const data = await client.fetch(query, params)
    return data
}

export async function fetchFavoritesForUsers(user1, user2) {
    const query = `{
        "user1movies": *[_type == "users" && name == $user1][0].favorites,
        "user2movies": *[_type == "users" && name == $user2][0].favorites,
        "sharedMovies": *[_type == "users" && name in [$user1, $user2]] {
            favorites
        }[0].favorites[(@ in *[_type == "users" && name == $user1][0].favorites) && (@ in *[_type == "users" && name == $user2][0].favorites)]    
    }`;

    const params = { user1, user2};
    const data = await client.fetch(query, params)
    return data
}

export async function fetchFavoritesUser1AndWishlistUser2(user1, user2) {
    const query = `{
        "user1movies": *[_type == "users" && name == $user1][0].favorites,
        "user2movies": *[_type == "users" && name == $user2][0].wishlist,
        "sharedMovies": *[_type == "users" && name in [$user1, $user2]] {
            favorites, 
            wishlist
        }[0].favorites[(@ in *[_type == "users" && name == $user1][0].favorites) && (@ in *[_type == "users" && name == $user2][0].wishlist)]    
    }`;

    const params = { user1, user2};
    const data = await client.fetch(query, params)
    return data
}

export async function fetchWishlistUser1AndFavoritesUser2(user1, user2) {
    const query = `{
        "user1movies": *[_type == "users" && name == $user1][0].wishlist,
        "user2movies": *[_type == "users" && name == $user2][0].favorites,
        "sharedMovies": *[_type == "users" && name in [$user1, $user2]] {
            wishlist, 
            favorites
        }[0].wishlist[(@ in *[_type == "users" && name == $user1][0].wishlist) && (@ in *[_type == "users" && name == $user2][0].favorites)]    
    }`;

    const params = { user1, user2};
    const data = await client.fetch(query, params)
    return data
}