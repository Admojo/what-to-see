export const genre = 
    {
        title: "Sjanger",
        name: "genre",
        type: "document",
        fields: [
            {
                title: "Sjanger",
                name: "genre",
                type: "string"
            },     
            {
                title: "Sjangerlink",
                name: "genreurl",
                type: "slug",
                options: {
                    source: "genre",
                    slugify: input => input.toLowerCase().replace(/\s+/g, '-')
                }
            }
        ]
    }