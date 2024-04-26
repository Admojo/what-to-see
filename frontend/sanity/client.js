import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "zw3rfckh",
    dataset: "production",
    useCdn: true,
    apiVersion: "2024-04-26"
})

export const writeClient = createClient({
    projectId: "zw3rfckh",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-04-26",
    token: "skA1EgH9YkVUAilq2rLNhlxVMNBLiWk4PTXYSfmnmWTMZMtwPdKjSALtwqZ13C6vshE6kQGABTQwRG4WJDpKE282rJBD6GWNdNDCJwCw2R10NpvYWftwZJAXIf52jB9X2ASl2jLAgYoySoqf5psUYr8S86iNiwCG832R4u7oKsaesFs1O5Gz"
})