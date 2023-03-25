import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

const getClient = () => {
    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: new HttpLink({
                uri: process.env.GRAPHQL_URI,
            }),
            cache: new InMemoryCache(),
        });
    }

    return client;
};

export default getClient;