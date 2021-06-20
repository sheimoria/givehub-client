import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.givehub.club/graphql',
  cache: new InMemoryCache()
})

export default client
