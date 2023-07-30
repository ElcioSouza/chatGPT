import {ApolloClient,InMemoryCache} from "@apollo/client"; 
const client = new ApolloClient({
    uri:"http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
          errorPolicy: 'all', // Defina o errorPolicy como 'all' para acessar a resposta completa
        },
     }
})

export default client;