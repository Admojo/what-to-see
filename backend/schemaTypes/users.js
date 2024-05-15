export const users = 
    {
        title: "Brukere",
        name: "users",
        type: "document",
        fields: [
            {
                title: "Navn",
                name: "name",
                type: "string"
            },
            {
                title: "Id",
                name: "id",
                type: "number"
            },
            {
                title: "Favoritt Sjangere",
                name: "genrelist",
                type: "array",
                of: [{
                    type: "string",
                    name: "genre"
                    }]
            },
            {
                title: "Ønskeliste Filmer",
                name: "wishlist",
                type: "array",
                of: [{
                    type: "string",
                    name: "movie"
                    }]
            },
            {
                title: "Favorittliste Filmer", 
                name: "favouritlist", 
                type: "array", 
                of: [{
                    type: "string", 
                    name: "movie"
                }]
            }
        ]
    }